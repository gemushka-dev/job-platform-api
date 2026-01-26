const companyService = require("./companiesService");

module.exports.getAllCompanies = async (req, res) => {
  const result = await companyService.getAllCompanies();
  res.status(200).json(result);
};

module.exports.getCompanyById = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await companyService.getCompanyById(id);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
    console.error(`[ERROR] ${e.message}`);
  }
};

module.exports.createCompany = async (req, res) => {
  try {
    const user = req.body;
    const result = await companyService.register(user);
    res.status(201).json(result);
    console.log(`[CREATED] company`);
  } catch (e) {
    switch (e.message) {
      case "User already exists":
        res.status(409).json({ message: e.message });
        break;
      case "Bad Request":
        res.status(400).json({ message: e.message });
        break;
      default:
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
    console.error(`[ERROR] ${e.message}`);
  }
};

module.exports.loginCompany = async (req, res) => {
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
    switch (e.message) {
      case "There is no such user":
        res.status(404).json({ message: e.message });
        break;
      case "Bad Request":
        res.status(400).json({ message: e.message });
        break;
      case "Incorrect password":
        res.status(400).json({ message: e.message });
        break;
      default:
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
    console.error(`[ERROR] ${e.message}`);
  }
};

module.exports.updateCompany = async (req, res) => {
  try {
    if (req.user?.role !== "company") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const id = req.user.id;
    const update = req.body;
    res.status(200).json(await companyService.updateCompany(id, update));
  } catch (e) {
    res.status(400).json({ message: "Bad Request" });
    console.error(`[ERROR] ${e.message}`);
  }
};
