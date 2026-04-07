const jobsService = require("./jobsService");

module.exports.getAllJobCards = async (req, res) => {
  const cards = await jobsService.getAllJobCards();
  res.status(200).json(cards);
};

module.exports.getJobCardById = async (req, res, next) => {
  try {
    const jobCard = await jobsService.getJobCardById(req.params.id);
    res.status(200).json(jobCard);
  } catch (e) {
    next(e);
  }
};

module.exports.createJobCard = async (req, res, next) => {
  try {
    const payload = req.user;
    const update = req.body;
    res.status(201).json(await jobsService.createJobCard(update, payload));
  } catch (e) {
    next(e);
  }
};

module.exports.updateJobCard = async (req, res, next) => {
  try {
    const payload = req.user;
    const update = req.body;
    res.status(200).json(await jobsService.updateJobCard(payload, update));
  } catch (e) {
    next(e);
  }
};
