import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config();

const user = process.env.db_user;
const password = process.env.db_password;
const database = process.env.db_name;

const pool = mysql.createPool({
    host: "localhost",
    user: `${user}`,
    password: `${password}`,
    database: `${database}`,
    connectionLimit: 10,
    queueLimit: 0
});

export default pool.promise();