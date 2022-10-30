const express = require("express");
const mongoose = require("mongoose");

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require("./config/config");

const postRoute = require("./routes/postRoutes");
const userRoute = require("./routes/userRoutes");

const app = express();

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    //   .connect("mongodb://root:123123@172.25.0.2:27017/?authSource=admin")
    .connect(mongoUrl)
    .then(() => {
      console.log("Succesfully connected to DB");
    })
    .catch((e) => {
      console.log(e);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.use(express.json())

app.get("/", (req, res) => {
  res.send("<h2>HI THERE</h2>");
});

app.use("/api/v1/posts", postRoute);
app.use("/api/v1/users", userRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
