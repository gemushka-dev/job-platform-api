const { database } = require("../database/initialization");

module.exports.getAllJobCards = async () => await database.getAllJobCards();

module.exports.getJobCardById = async (id) => await database.getCardById(id);

module.exports.createJobCard = async (card) => {
  return await database.createJobCard(card);
};

module.exports.getJobCardByWorker = async (workerId) =>
  await database.getJobCardByWorker(workerId);

module.exports.updateJobCard = async (value, field, id) =>
  await database.updateJobCardById(value, field, id);
