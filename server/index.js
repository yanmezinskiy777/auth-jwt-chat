require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const WSserver = require("express-ws");
const authRouter = require("./router/auth");
const chatController = require("./controllers/chat-controller");
const errorMiddleware = require("./middleware/error-middleware");
const app = express();
const expressWs = WSserver(app);
var aWss = expressWs.getWss('/a');

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", authRouter);
app.ws("/chat", (ws, req) => chatController(ws, req, aWss));
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
