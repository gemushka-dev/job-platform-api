const { Router } = require("express");
const path = require("path");
const { auth } = require("../auth/authMiddleware");
const companiesController = require("./companiesController");

const companiesRouter = Router();

companiesRouter.get("/", companiesController.getAllCompanies);

companiesRouter.get("/:id", companiesController.getCompanyById);

companiesRouter.post("/register", companiesController.createCompany);

companiesRouter.post("/login", companiesController.loginCompany);

companiesRouter.patch("/me", auth, companiesController.updateCompany);

module.exports.companiesRouter = companiesRouter;
