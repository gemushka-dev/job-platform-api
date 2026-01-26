const applicationsService = require("./applicationService");

module.exports.getApplicationsByWorkerId = async (req, res) => {
  const workerId = req.user.id;
  res
    .status(200)
    .json(await applicationsService.getApplicationsByWorkerId(workerId));
};

module.exports.createApplication = async (req, res) => {
  try {
    const payload = req.user;
    const jobId = req.body.jobId;
    res
      .status(201)
      .json(await applicationsService.createApplication(payload, jobId));
  } catch (e) {
    switch (e.message) {
      case "Forbidden":
        res.status(403).json({ message: e.message });
        break;
      default:
        res.status(500).json({ message: "Internal Server Error" });
        break;
    }
    console.error(`[ERROR] ${e.message}`);
  }
};

module.exports.updateApplication = async (req, res) => {
  try {
    const status = req.body.status;
    const applicationId = req.body.applicationId;
    const payload = req.user;
    res
      .status(200)
      .json(
        await applicationsService.updateApplication(
          payload,
          applicationId,
          status,
        ),
      );
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
