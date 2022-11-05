const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const { createClient } = require("redis");
// const redis = require("redis")
let RedisStore = require("connect-redis")(session);
const cors = require('cors')

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require("./config/config");

let redisClient = createClient({ host: REDIS_URL, port: REDIS_PORT });

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

app.enable("trust proxy");
app.use(cors({}))

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      resave: false,
      saveUninitialized: false,
      httpOnly: true,
      maxAge: 30000,
    },
  })
);

app.use(express.json());


app.get("/api/v1", (req, res) => {
  console.log("YEAH IT RAN");
  res.send("<h2>HI THERE</h2>");
});

app.use("/api/v1/posts", postRoute);
app.use("/api/v1/users", userRoute);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`));
