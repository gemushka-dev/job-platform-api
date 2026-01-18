require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");

const workersRepo = require("./workersRepository");

const allowedFields = {
  fullName: "full_name",
  surName: "sur_name",
  description: "description",
  avatar: "avatar",
};

module.exports.getAllWorkers = async () => {
  return await workersRepo.getAllWorkers();
};

module.exports.getWorkerByID = async (id) => {
  const worker = await workersRepo.getWorkerById(id);
  if (!worker || !worker.email) {
    throw new Error("Worker not found");
  }
  return worker;
};

module.exports.register = async (user) => {
  if (!user?.email || !user?.password || !user?.fullName) {
    throw new Error("Bad Request");
  }

  const worker = await workersRepo.getWorkerJWT(user.email);
  if (worker) {
    if (user.avatar != "default_img.jpg") {
      await fs.promises.unlink(path.resolve("uploads", user.avatar));
    }
    throw new Error("User already exists");
  }

  const hashed_password = await bcrypt.hash(user.password, 10);

  const newWorker = {
    fullName: user.fullName,
    surName: user.surName,
    email: user.email,
    password: hashed_password,
    birthDate: user.birthDate,
    description: user.description,
    avatar: user.avatar,
  };
  const created = await workersRepo.createWorker(newWorker);
  return { message: "Register successfully" };
};

module.exports.login = async (user) => {
  const { password, email } = user;
  if (!password || !email) {
    throw new Error("Bad Request");
  }
  const registredWorker = await workersRepo.getWorkerJWT(email);
  if (!registredWorker) {
    throw new Error("There is no such user");
  }
  const valid = await bcrypt.compare(password, registredWorker.password);

  if (!valid) {
    throw new Error("Incorrect password");
  }
  const payload = {
    id: registredWorker.worker_id,
    username: registredWorker.full_name,
    role: "worker",
  };
  const token = await jwt.sign(payload, process.env.SECRET, {
    expiresIn: "7d",
  });
  return token;
};

module.exports.updateWorker = async (id, update) => {
  for (const key in allowedFields) {
    if (
      update[key] !== undefined &&
      update[key] !== null &&
      update[key] !== ""
    ) {
      await workersRepo.updateWorkerById(update[key], allowedFields[key], id);
    }
  }
  return { message: "Profile updated" };
};
