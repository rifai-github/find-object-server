import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); // Load variabel dari .env

// Buat koneksi pool ke MySQL
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT), // Pastikan port dalam bentuk number
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Cek koneksi
pool.getConnection()
    .then((conn) => {
        console.log("✅ MySQL Connected!");
        conn.release();
    })
    .catch((err) => console.error("❌ MySQL Connection Error:", err));

export default pool;
