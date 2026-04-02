const workersService = require("./workersService");

module.exports.getAllWorkers = async (req, res) => {
  const workers = await workersService.getAllWorkers();
  res.status(200).json(workers);
};

module.exports.getWorkerById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const worker = await workersService.getWorkerByID(id);
    res.status(200).json(worker);
  } catch (e) {
    next(e);
  }
};

module.exports.createWorker = async (req, res, next) => {
  try {
    const user = req.body;
    user.avatar = req.file?.filename || "default_img.jpg";
    const mes = await workersService.register(user);
    res.status(201).json(mes);
    console.log(`[CREATED] worker`);
  } catch (e) {
    next(e);
  }
};

module.exports.loginWorker = async (req, res, next) => {
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
    next(e);
  }
};

module.exports.updateWorker = async (req, res, next) => {
  try {
    if (req.user?.role !== "worker") {
      throw new Error("Forbidden");
    }
    const workerId = req.user.id;
    const update = req.body;
    res.status(200).json(await workersService.updateWorker(workerId, update));
  } catch (e) {
    next(e);
  }
};
