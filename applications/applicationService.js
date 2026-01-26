const { database } = require("../database/initialization");
const applicationsRepo = require("./applicationRepository");

const allowedStatuses = ["pending", "accepted", "rejected"];

module.exports.getApplicationsByWorkerId = async (id) =>
  await applicationsRepo.getApplicationByWorkerId(id);

module.exports.createApplication = async (payload, jobId) => {
  if (payload?.role !== "company") {
    throw new Error("Forbidden");
  }
  const result = await database.getJobCardById(jobId);
  const newApplication = {
    workerId: result.worker_id,
    jobId,
    companyId: payload.id,
  };
  return await applicationsRepo.createApplication(newApplication);
};

module.exports.updateApplication = async (payload, applicationId, value) => {
  if (payload?.role !== "worker") {
    throw new Error("Forbidden");
  }
  if (!allowedStatuses.includes(value)) {
    throw new Error("Bad Request");
  }
  return await applicationsRepo.updateApplication(
    applicationId,
    payload.id,
    value,
  );
};
