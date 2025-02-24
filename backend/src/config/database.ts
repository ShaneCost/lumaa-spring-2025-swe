import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["DB_USER", "DB_HOST", "DB_NAME", "DB_PASS", "DB_PORT"];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    console.error(`Error: Missing required environment variable: ${varName}`);
    process.exit(1); 
  }
});

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: Number(process.env.DB_PORT),
});

pool
  .connect()
  .then(() => console.log("Connected to the database"))
  .catch((err) => {
    console.error("Database connection error", err);
    process.exit(1); 
  });

export default pool;

