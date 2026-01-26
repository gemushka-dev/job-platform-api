require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const companiesRepo = require("./companiesRepository");

const allowedFields = {
  companyName: "company_name",
  description: "description",
};

module.exports.getAllCompanies = async () => {
  return await companiesRepo.getAllCompanies();
};

module.exports.getCompanyById = async (id) => {
  const company = await companiesRepo.getCompanyById(id);
  if (!company || !company.email) {
    throw new Error("Company not found");
  }
  return company;
};

module.exports.register = async (company) => {
  if (!company?.email || !company?.password || !company?.companyName) {
    throw new Error("Bad Request");
  }

  const registredCompany = await companiesRepo.getCompanyJWT(company.email);
  if (registredCompany) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(company.password, 10);

  const newCompany = {
    companyName: company.companyName,
    email: company.email,
    password: hashedPassword,
    description: company.description,
  };
  await companiesRepo.createCompany(newCompany);
  return { message: "Register successfully" };
};

module.exports.login = async (company) => {
  const { password, email } = company;
  if (!password || !email) {
    throw new Error("Bad Request");
  }
  const registredCompany = await companiesRepo.getCompanyJWT(email);
  if (!registredCompany) {
    throw new Error("There is no such user");
  }
  const valid = await bcrypt.compare(password, registredCompany.password);
  if (!valid) {
    throw new Error("Incorrect password");
  }
  const payload = {
    id: registredCompany.company_id,
    username: registredCompany.company_name,
    role: "company",
  };
  const token = await jwt.sign(payload, process.env.SECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports.updateCompany = async (id, update) => {
  for (const key in allowedFields) {
    if (
      update[key] !== undefined &&
      update[key] !== null &&
      update[key] !== ""
    ) {
      await companiesRepo.updateCompany(update[key], allowedFields[key], id);
    }
  }
  return { message: "Profile updated" };
};
