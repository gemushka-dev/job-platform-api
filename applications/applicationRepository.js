const { database } = require("../database/initialization");

module.exports.getApplicationByWorkerId = async (id) =>
  await database.getApplicationsByWorkerId(id);

module.exports.createApplication = async ({ workerId, jobId, companyId }) =>
  await database.createApplication(workerId, jobId, companyId);

module.exports.updateApplication = async (applicationId, workerId, value) =>
  await database.updateApplication(applicationId, workerId, value);
