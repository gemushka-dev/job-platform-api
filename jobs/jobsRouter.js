const { Router } = require("express");

const jobCardsRouter = Router();

const { auth } = require("../auth/authMiddleware");
const jobsController = require("./jobsController");

jobCardsRouter.get("/", jobsController.getAllJobCards);

jobCardsRouter.get("/:id", jobsController.getJobCardById);

jobCardsRouter.post("/create", auth, jobsController.createJobCard);

jobCardsRouter.patch("/update", auth, jobsController.updateJobCard);

module.exports.jobCardsRouter = jobCardsRouter;
