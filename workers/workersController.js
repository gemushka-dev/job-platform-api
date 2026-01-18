const workersService = require("./workersService");

module.exports.getAllWorkers = async (req, res) => {
  const workers = await workersService.getAllWorkers();
  res.status(200).json(workers);
};

module.exports.getWorkerById = async (req, res) => {
  try {
    const id = req.params.id;
    const worker = await workersService.getWorkerByID(id);
    res.status(200).json(worker);
  } catch (e) {
    res.status(404).send("Not Found");
    console.error(`[ERROR] ${e.message}`);
  }
};

module.exports.createWorker = async (req, res) => {
  try {
    const user = req.body;
    user.avatar = req.file?.filename || "default_img.jpg";
    const mes = await workersService.register(user);
    res.status(201).json(mes);
    console.log(`[CREATED] worker`);
  } catch (e) {
    switch (e.message) {
      case "User already exists":
        res.status(409).send("User already exists");
        break;
      default:
        res.status(400).send("Bad Request");
    }
    console.error(`[ERROR] ${e.message}`);
  }
};

module.exports.loginWorker = async (req, res) => {
  try {
    const user = req.body;
    const JWT = await workersService.login(user);

    res.cookie("access_token", JWT, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });
    res.status(200).json({ message: "Logged in" });
  } catch (e) {
    switch (e.message) {
      case "There is no such user":
        res.status(404).send(e.message);
        break;
      default:
        res.status(400).send(e.message);
        break;
    }
    console.error(`[ERROR] ${e.message}`);
  }
};

module.exports.updateWorker = async (req, res) => {
  try {
    if (req.user?.role !== "worker") {
      return res.status(403).send("Forbidden");
    }
    const workerId = req.user.id;
    const update = req.body;
    res.status(200).json(await workersService.updateWorker(workerId, update));
  } catch (e) {
    res.status(400).send("Bad Request");
    console.error(`[ERROR] ${e.message}`);
  }
};
