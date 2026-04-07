const { Router } = require("express");

const jobCardsRouter = Router();

const { auth } = require("../auth/authMiddleware");
const jobsController = require("./jobsController");
const {
  jobsCreateValidation,
  jobsUpdateValidation,
} = require("../validation/validationMiddleware");

jobCardsRouter.get("/", jobsController.getAllJobCards);

jobCardsRouter.get("/:id", jobsController.getJobCardById);

jobCardsRouter.post(
  "/create",
  auth,
  jobsCreateValidation,
  jobsController.createJobCard,
);

jobCardsRouter.patch(
  "/update",
  auth,
  jobsUpdateValidation,
  jobsController.updateJobCard,
);

module.exports.jobCardsRouter = jobCardsRouter;
