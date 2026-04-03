const { Router } = require("express");
const { auth } = require("../auth/authMiddleware");

const companiesController = require("./companiesController");

const {
  companiesRegisterValidation,
  companiesLoginValidation,
  companiesUpdateValidation,
} = require("../validation/validationMiddleware");

const companiesRouter = Router();

companiesRouter.get("/", companiesController.getAllCompanies);

companiesRouter.get("/:id", companiesController.getCompanyById);

companiesRouter.post(
  "/register",
  companiesRegisterValidation,
  companiesController.createCompany,
);

companiesRouter.post(
  "/login",
  companiesLoginValidation,
  companiesController.loginCompany,
);

companiesRouter.patch(
  "/me",
  auth,
  companiesUpdateValidation,
  companiesController.updateCompany,
);

module.exports.companiesRouter = companiesRouter;
