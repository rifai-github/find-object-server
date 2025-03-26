"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load variabel dari .env
// Buat koneksi pool ke MySQL
const pool = promise_1.default.createPool({
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
exports.default = pool;
//# sourceMappingURL=database.js.map