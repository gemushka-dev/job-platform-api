const { database } = require("../database/initialization");

module.exports.getAllCompanies = async () => await database.getAllCompanies();

module.exports.getCompanyById = async (id) => await database.getCompanyById(id);

module.exports.getCompanyJWT = async (email) =>
  await database.getCompanyByEmailJWT(email);

module.exports.createCompany = async ({
  companyName,
  email,
  password,
  description,
}) => {
  return await database.createCompany({
    companyName,
    email,
    password,
    description,
  });
};

module.exports.updateCompany = async (value, field, id) =>
  await database.updateCompanyByID(value, field, id);
