const { pool } = require("./pool");

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
    return await pool.query(
      `SELECT worker_id, full_name, sur_name, email, birth_date, description, avatar, created_at FROM workers`
    );
  }

  async getWorkersById(value) {
    return await pool.query(
      `SELECT worker_id, full_name, sur_name, email, birth_date, description, avatar, created_at FROM workers WHERE worker_id = $1`,
      [value]
    );
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
    return await pool.query(
      `INSERT INTO workers(full_name,sur_name,email,password,birth_date,description,avatar) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
      [fullName, surName, email, password, birthDate, description, avatar]
    );
  }

  async getAllCompanies() {
    return await pool.query(
      `SELECT company_id ,company_name ,email ,description, created_at  FROM companies`
    );
  }

  async getCompanyById(value) {
    return await pool.query(
      `SELECT company_id ,company_name ,email ,description, created_at FROM companies WHERE company_id  = $1`,
      [value]
    );
  }

  async createCompany({ companyName, email, password, description }) {
    return await pool.query(
      `INSERT INTO companies(company_name , email , password , description) VALUES($1,$2,$3,$4) RETURNING *`,
      [companyName, email, password, description]
    );
  }

  async getCardById(value) {
    return await pool.query(`SELECT * FROM jobs WHERE job_id = $1`, [value]);
  }
}

const database = new Database();

module.exports.database = database;
