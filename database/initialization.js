const { pool } = require("./pool");

const allowedFields = [
  "full_name",
  "sur_name",
  "description",
  "avatar",
  "company_name",
  "job_name",
  "skills",
  "project_link_1",
  "project_link_2",
  "project_link_3",
];

class Database {
  constructor() {}

  async init() {
    try {
      const workerQuery = `
        CREATE TABLE IF NOT EXISTS workers(
            worker_id SERIAL,
            full_name VARCHAR(64) NOT NULL,
            sur_name VARCHAR(64) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            birth_date DATE NOT NULL,
            description TEXT,
            avatar TEXT,
            created_at TIMESTAMP DEFAULT NOW(),

            CONSTRAINT pk_worker_id PRIMARY KEY(worker_id)
        )
    `;
      const employeeQuery = `
        CREATE TABLE IF NOT EXISTS companies(
            company_id SERIAL,
            company_name VARCHAR(64) NOT NULL,
            email TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL,
            description TEXT,
            created_at TIMESTAMP DEFAULT NOW(),

            CONSTRAINT pk_company_id PRIMARY KEY(company_id)
        )
  `;
      const jobCardQuery = `
        CREATE TABLE IF NOT EXISTS jobs (
            job_id SERIAL,
            job_name VARCHAR(64) NOT NULL,
            skills TEXT,
            project_link_1 TEXT,
            project_link_2 TEXT,
            project_link_3 TEXT,
            created_at TIMESTAMP DEFAULT NOW(),
            worker_id INT NOT NULL,

            CONSTRAINT pk_job_id PRIMARY KEY(job_id),
            CONSTRAINT fk_worker_id FOREIGN KEY(worker_id) REFERENCES workers(worker_id) ON DELETE CASCADE
        )
  `;
      const applicationQuery = `
        CREATE TABLE IF NOT EXISTS applications(
        application_id SERIAL PRIMARY KEY,
        worker_id INT NOT NULL REFERENCES workers(worker_id) ON DELETE CASCADE,
        company_id INT NOT NULL REFERENCES companies(company_id) ON DELETE CASCADE,
        job_id INT NOT NULL REFERENCES jobs(job_id) ON DELETE CASCADE,
        status VARCHAR(16) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT NOW()
    );`;
      await pool.query(workerQuery);
      await pool.query(employeeQuery);
      await pool.query(jobCardQuery);
      await pool.query(applicationQuery);
      console.log("[TABLES] created or existed");
    } catch (e) {
      console.log(`Something went wrong.Error: ${e}`);
    }
  }

  async getAllWorkers() {
    const result = await pool.query(
      `SELECT worker_id, full_name, sur_name, email, birth_date, description, avatar, created_at FROM workers`,
    );
    return result.rows;
  }

  async getWorkersById(value) {
    const result = await pool.query(
      `SELECT worker_id, full_name, sur_name, email, birth_date, description, avatar, created_at FROM workers WHERE worker_id = $1`,
      [value],
    );
    return result.rows[0];
  }

  async getWorkerByEmailJWT(value) {
    const result = await pool.query(`SELECT * FROM workers WHERE email = $1`, [
      value,
    ]);
    return result.rows[0];
  }

  async updateWorkerByID(value, field, id) {
    if (allowedFields.includes(field)) {
      const result = await pool.query(
        `UPDATE workers SET ${field} = $1 WHERE worker_id = $2 RETURNING *`,
        [value, id],
      );
      return result.rows[0];
    }
    return "Invalid Field";
  }

  async createWorker({
    fullName,
    surName,
    email,
    password,
    birthDate,
    description,
    avatar,
  }) {
    const result = await pool.query(
      `INSERT INTO workers(full_name,sur_name,email,password,birth_date,description,avatar) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [fullName, surName, email, password, birthDate, description, avatar],
    );
    return result.rows[0];
  }

  async getAllCompanies() {
    const result = await pool.query(
      `SELECT company_id ,company_name ,email ,description, created_at  FROM companies`,
    );
    return result.rows;
  }

  async getCompanyById(value) {
    const result = await pool.query(
      `SELECT company_id ,company_name ,email ,description, created_at FROM companies WHERE company_id  = $1`,
      [value],
    );
    return result.rows[0];
  }

  async getCompanyByEmailJWT(value) {
    const result = await pool.query(
      `SELECT * FROM companies WHERE email = $1`,
      [value],
    );
    return result.rows[0];
  }

  async updateCompanyByID(value, field, id) {
    if (allowedFields.includes(field)) {
      const result = await pool.query(
        `UPDATE companies SET ${field} = $1 WHERE company_id = $2 RETURNING *`,
        [value, id],
      );
      return result.rows[0];
    }
    return "Invalid Field";
  }

  async createCompany({ companyName, email, password, description }) {
    const result = await pool.query(
      `INSERT INTO companies(company_name , email , password , description) VALUES($1,$2,$3,$4) RETURNING *`,
      [companyName, email, password, description],
    );
    return result.rows[0];
  }

  async getAllJobCards() {
    const result = await pool.query("SELECT * FROM jobs");
    return result.rows;
  }

  async getJobCardById(value) {
    const result = await pool.query(`SELECT * FROM jobs WHERE job_id = $1`, [
      value,
    ]);
    return result.rows[0];
  }

  async createJobCard({
    jobName,
    skills,
    projectLink1,
    projectLink2,
    projectLink3,
    workerId,
  }) {
    const resut = await pool.query(
      "INSERT INTO jobs(job_name, skills,project_link_1,project_link_2,project_link_3, worker_id) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [jobName, skills, projectLink1, projectLink2, projectLink3, workerId],
    );
    return resut.rows[0];
  }

  async getJobCardByWorker(workerId) {
    const result = await pool.query("SELECT * FROM jobs WHERE worker_id = $1", [
      workerId,
    ]);
    return result.rows[0];
  }
  async getCardById(id) {
    const result = await pool.query("SELECT * FROM jobs WHERE job_id = $1", [
      id,
    ]);
    return result.rows[0];
  }

  async updateJobCardById(value, field, id) {
    if (allowedFields.includes(field)) {
      const result = await pool.query(
        `UPDATE jobs SET ${field} = $1 WHERE worker_id = $2 RETURNING *`,
        [value, id],
      );
      return result.rows[0];
    }
    return "Invalid Field";
  }

  async getApplicationsByWorkerId(workerId) {
    const result = await pool.query(
      "SELECT * FROM applications WHERE worker_id = $1",
      [workerId],
    );
    return result.rows;
  }

  async createApplication(workerId, jobId, companyId) {
    const result = await pool.query(
      "INSERT INTO applications(worker_id , job_id , company_id) VALUES($1,$2,$3) RETURNING *",
      [workerId, jobId, companyId],
    );
    return result.rows[0];
  }

  async updateApplication(applicationId, workerId, value) {
    const result = await pool.query(
      "UPDATE applications SET status = $1 WHERE worker_id = $2 AND application_id = $3 RETURNING *",
      [value, workerId, applicationId],
    );
    return result.rows[0];
  }
}

const database = new Database();

module.exports.database = database;
