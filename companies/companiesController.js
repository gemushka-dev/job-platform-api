const HttpError = require("../error/httpError");
const companyService = require("./companiesService");

module.exports.getAllCompanies = async (req, res) => {
  const result = await companyService.getAllCompanies();
  res.status(200).json(result);
};

module.exports.getCompanyById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await companyService.getCompanyById(id);
    res.status(200).json(result);
  } catch (e) {
    next(e);
  }
};

module.exports.createCompany = async (req, res, next) => {
  try {
    const user = req.body;
    const result = await companyService.register(user);
    res.status(201).json(result);
    console.log(`[CREATED] company`);
  } catch (e) {
    next(e);
  }
};

module.exports.loginCompany = async (req, res, next) => {
  try {
    const user = req.body;
    const JWT = await companyService.login(user);

    res.cookie("access_token", JWT, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: "Logged in" });
  } catch (e) {
    next(e);
  }
};

module.exports.updateCompany = async (req, res, next) => {
  try {
    if (req.user?.role !== "company") {
      throw new HttpError("Forbidden", 403);
    }
    const id = req.user.id;
    const update = req.body;
    res.status(200).json(await companyService.updateCompany(id, update));
  } catch (e) {
    next(e);
  }
};
