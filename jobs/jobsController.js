const jobsService = require("./jobsService");

module.exports.getAllJobCards = async (req, res) => {
  const cards = await jobsService.getAllJobCards();
  res.status(200).json(cards);
};

module.exports.getJobCardById = async (req, res) => {
  try {
    const jobCard = await jobsService.getJobCardById(req.params.id);
    res.status(200).json(jobCard);
  } catch (e) {
    res.status(404).json({ message: "Not Found" });
    console.error(`[ERROR] ${e.message}`);
  }
};

module.exports.createJobCard = async (req, res) => {
  try {
    const payload = req.user;
    const update = req.body;
    console.log(update);
    res.status(201).json(await jobsService.createJobCard(update, payload));
  } catch (e) {
    switch (e.message) {
      case "Forbidden":
        res.status(403).json({ message: e.message });
        break;
      case "Worker already have job card":
        res.status(409).json({ message: e.message });
        break;
      default:
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
    console.error(`[ERROR] ${e.message}`);
  }
};

module.exports.updateJobCard = async (req, res) => {
  try {
    const payload = req.user;
    const update = req.body;
    res.status(200).json(await jobsService.updateJobCard(payload, update));
  } catch (e) {
    switch (e.message) {
      case "Forbidden":
        res.status(403).json({ message: e.message });
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
