const { Router } = require("express");
const applicationController = require("./applicationController");
const { auth } = require("../auth/authMiddleware");

const applicationRouter = Router();

applicationRouter.get(
  "/",
  auth,
  applicationController.getApplicationsByWorkerId,
);

applicationRouter.post(
  "/create",
  auth,
  applicationController.createApplication,
);

applicationRouter.patch(
  "/update",
  auth,
  applicationController.updateApplication,
);

module.exports.applicationRouter = applicationRouter;
