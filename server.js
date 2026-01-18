const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const { database } = require("./database/initialization");

const { workersRouter } = require("./workers/workersRouter");

const PORT = 3500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("uploads"));
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  }),
);
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});
app.use("/workers", workersRouter);

async function start() {
  try {
    await database.init();
    app.listen(PORT, () => {
      console.log(`Server works on ${PORT} port`);
    });
  } catch (e) {
    console.log(`Something went wrong.Error: ${e}`);
    process.exit(1);
  }
}

start();
