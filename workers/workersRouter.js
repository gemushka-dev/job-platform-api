const { Router } = require("express");
const path = require("path");
const multer = require("multer");

const workerController = require("./workersController");
const { auth } = require("../auth/authMiddleware");

const uploads = multer({ dest: path.resolve("uploads/") });

const workersRouter = Router();

workersRouter.get("/", workerController.getAllWorkers);

workersRouter.get("/:id", workerController.getWorkerById);

workersRouter.post(
  "/register",
  uploads.single("avatar"),
  workerController.createWorker,
);

workersRouter.post("/login", workerController.loginWorker);

workersRouter.post(
  "/me",
  uploads.single("avatar"),
  auth,
  workerController.updateWorker,
);

module.exports.workersRouter = workersRouter;
