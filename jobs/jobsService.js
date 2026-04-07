require("dotenv").config();

const HttpError = require("../error/httpError");
const jobsRepo = require("./jobsRepository");

const allowedFields = {
  jobName: "job_name",
  skills: "skills",
  projectLink1: "project_link_1",
  projectLink2: "project_link_2",
  projectLink3: "project_link_3",
};

module.exports.getAllJobCards = async () => await jobsRepo.getAllJobCards();

module.exports.getJobCardById = async (id) => {
  const jobCard = await jobsRepo.getJobCardById(id);
  if (!jobCard?.job_name) {
    throw new HttpError("Not Found", 404);
  }
  return jobCard;
};

module.exports.createJobCard = async (jobCard, payload) => {
  const createdJobCard = await jobsRepo.getJobCardByWorker(payload.id);
  if (createdJobCard?.job_id) {
    throw new HttpError("Worker already have job card", 400);
  }

  if (payload?.role !== "worker") {
    throw new HttpError("Forbidden", 403);
  }

  const newJobCard = {
    jobName: jobCard.jobName,
    skills: jobCard.skills,
    projectLink1: jobCard.projectLink1,
    projectLink2: jobCard.projectLink2,
    projectLink3: jobCard.projectLink3,
    workerId: payload.id,
  };
  console.log(newJobCard);
  const result = await jobsRepo.createJobCard(newJobCard);
  return { message: "Job Card created", job: result };
};

module.exports.updateJobCard = async (payload, update) => {
  if (payload?.role !== "worker") {
    throw new HttpError("Forbidden", 403);
  }
  for (const key in allowedFields) {
    if (
      update[key] !== undefined &&
      update[key] !== null &&
      update[key] !== ""
    ) {
      await jobsRepo.updateJobCard(update[key], allowedFields[key], payload.id);
    }
  }
  return { message: "Job Card updated" };
};
