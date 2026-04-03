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

const companiesRegisterSchema = z.object({
  companyName: z
    .string({ message: "Incorrect companyName type" })
    .min(3, { message: "companyName must be at least 3 characters long" })
    .max(64),
  email: z.email({ message: "Incorrect email type" }),
  password: z
    .string({ message: "Incorrect password type" })
    .min(8, { message: "password must be at least 8 characters long" }),
  description: z.string({ message: "Incorrect description type" }),
});

const companiesLoginSchema = z.object({
  email: z.email({ message: "Incorrect email type" }),
  password: z
    .string({ message: "Incorrect password type" })
    .min(8, { message: "password must be at least 8 characters long" }),
});

const companiesUpdateSchema = z.object({
  companyName: z
    .string({ message: "Incorrect companyName type" })
    .min(3, { message: "companyName must be at least 3 characters long" })
    .max(64)
    .optional(),
  description: z.string({ message: "Incorrect description type" }).optional(),
});

module.exports.companiesRegisterValidation = (req, res, next) => {
  try {
    const validatedData = companiesRegisterSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.companiesLoginValidation = (req, res, next) => {
  try {
    const validatedData = companiesLoginSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.companiesUpdateValidation = (req, res, next) => {
  try {
    const validatedData = companiesUpdateSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};

const jobsCreateSchema = z.object({
  jobName: z.string({ message: "Incorrect jobName type" }).max(64),
  skills: z.string({ message: "Incorrect jobName type" }).min(16),
  projectLink1: z.string({ message: "Incorrect jobName type" }).optional(),
  projectLink2: z.string({ message: "Incorrect jobName type" }).optional(),
  projectLink3: z.string({ message: "Incorrect jobName type" }).optional(),
});

const jobsUpdateSchema = z.object({
  jobName: z.string({ message: "Incorrect jobName type" }).max(64).optional(),
  skills: z.string({ message: "Incorrect jobName type" }).optional(),
  projectLink1: z.string({ message: "Incorrect jobName type" }).optional(),
  projectLink2: z.string({ message: "Incorrect jobName type" }).optional(),
  projectLink3: z.string({ message: "Incorrect jobName type" }).optional(),
});

module.exports.jobsCreateValidation = (req, res, next) => {
  try {
    const validatedData = jobsCreateSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};

module.exports.jobsUpdateValidation = (req, res, next) => {
  try {
    const validatedData = jobsUpdateSchema.parse(req.body);
    req.body = validatedData;
    next();
  } catch (e) {
    next(e);
  }
};
