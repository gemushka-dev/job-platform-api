const express = require("express");
const { database } = require("./database/initialization");

const PORT = 3500;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

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
