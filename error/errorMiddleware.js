const { ZodError } = require("zod");
const HttpError = require("./httpError");

module.exports = (err, req, res, next) => {
  console.log(`[ERROR] ${err}`);
  if (err instanceof ZodError) {
    return res
      .status(400)
      .json({ message: "Validation error", errors: err.issues });
  }

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal Server Error" });
};
