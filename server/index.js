require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors")
const authRouter = require("./router/auth");
const errorMiddleware = require("./middleware/error-middleware");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}))
app.use("/api", authRouter);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(process.env.PORT, () =>
      console.log(`App listen to POST: ${process.env.PORT}`)
    );
  } catch (error) {
    console.log("Something went wrong " + error);
  }
};
start();
