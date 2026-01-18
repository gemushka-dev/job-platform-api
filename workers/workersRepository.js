const { database } = require("../database/initialization");

module.exports.getAllWorkers = async () => {
  return await database.getAllWorkers();
};

module.exports.getWorkerById = async (id) => {
  return await database.getWorkersById(id);
};

module.exports.getWorkerJWT = async (id) => {
  return await database.getWorkerByEmailJWT(id);
};

module.exports.updateWorkerById = async (value, field, id) => {
  return await database.updateWorkerByID(value, field, id);
};

module.exports.createWorker = async ({
  fullName,
  surName,
  email,
  password,
  birthDate,
  description,
  avatar,
}) => {
  return await database.createWorker({
    fullName,
    surName,
    email,
    password,
    birthDate,
    description,
    avatar,
  });
};
