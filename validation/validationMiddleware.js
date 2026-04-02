const { z } = require("zod");

const workerRegisterSchema = z.object({
  fullName: z
    .string({ message: "Incorrect fullName type" })
    .min(3, { message: "fullName must be at least 3 characters long" })
    .max(64),
  surName: z
    .string({ message: "Incorrect surName type" })
    .min(3, { message: "surName must be at least 3 characters long" })
    .max(64),
  email: z.email({ message: "Incorrect email type" }),
  password: z
    .string({ message: "Incorrect password type" })
    .min(8, { message: "password must be at least 8 characters long" }),
  description: z.string({ message: "Incorrect description type" }).optional(),
});

const workersLoginSchema = z.object({
  email: z.email({ message: "Incorrect email type" }),
  password: z
    .string({ message: "Incorrect password type" })
    .min(8, { message: "password must be at least 8 characters long" }),
});

const workersUpdateSchema = z.object({
  fullName: z
    .string({ message: "Incorrect fullName type" })
    .min(3, { message: "fullName must be at least 3 characters long" })
    .max(64)
    .optional(),
  surName: z
    .string({ message: "Incorrect surName type" })
    .min(3, { message: "surName must be at least 3 characters long" })
    .max(64)
    .optional(),
  description: z.string({ message: "Incorrect description type" }).optional(),
});

module.exports.workersRegisterValidation = (req, res, next) => {
  try {
    const validatedData = workerRegisterSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.workersLoginValidation = (req, res, next) => {
  try {
    const validatedData = workersLoginSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.workersUpdateValidation = (req, res, next) => {
  try {
    const validatedData = workersUpdateSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};
