const { Router } = require("express");
const path = require("path");
const multer = require("multer");

const workerController = require("./workersController");
const { auth } = require("../auth/authMiddleware");

const uploads = require("../multer/multerSettings");

const workersRouter = Router();

workersRouter.get("/", workerController.getAllWorkers);

workersRouter.get("/:id", workerController.getWorkerById);

workersRouter.post(
  "/register",
  uploads.single("avatar"),
  workerController.createWorker,
);

workersRouter.post("/login", workerController.loginWorker);

workersRouter.patch(
  "/me",
  uploads.single("avatar"),
  auth,
  workerController.updateWorker,
);

module.exports.workersRouter = workersRouter;
