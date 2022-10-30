const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
  const { userName, password } = req.body;
  const hashpassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await User.create({
      userName: userName,
      password: hashpassword,
    });
    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.login = async (req, res, next) => {
  const { userName, password } = req.body;
  //   const hashpassword = await bcrypt.hash(password, 12);

  try {
    const user = await User.findOne({
      userName,
    });
    // const user = await User.find();

    // console.log(user);

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found",
      });
    }

    let isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      return res.status(200).json({
        status: "success",
      });
    } else {
      return res.status(400).json({
        status: "fail",
        message: "Incorrect username or password",
      });
    }
  } catch (e) {
    res.status(400).json({
      status: "fail",
    });
  }
};
