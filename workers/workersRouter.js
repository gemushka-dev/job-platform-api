const { Router } = require("express");
const path = require("path");
const multer = require("multer");

const workerController = require("./workersController");
const { auth } = require("../auth/authMiddleware");
const {
  workersRegisterValidation,
  workersLoginValidation,
  workersUpdateValidation,
} = require("../validation/validationMiddleware");

const uploads = require("../multer/multerSettings");

const workersRouter = Router();

workersRouter.get("/", workerController.getAllWorkers);

workersRouter.get("/:id", workerController.getWorkerById);

workersRouter.post(
  "/register",
  uploads.single("avatar"),
  workersRegisterValidation,
  workerController.createWorker,
);

workersRouter.post(
  "/login",
  workersLoginValidation,
  workerController.loginWorker,
);

workersRouter.patch(
  "/me",
  uploads.single("avatar"),
  workersUpdateValidation,
  auth,
  workerController.updateWorker,
);

module.exports.workersRouter = workersRouter;
