"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newUser = newUser;
exports.getUserByUsername = getUserByUsername;
exports.getUserById = getUserById;
const constant_value_1 = require("../constant.value");
const database_1 = __importDefault(require("../database"));
async function newUser(username, name, password) {
    const query = `INSERT INTO ${constant_value_1.SQLTable.Users} (username, name, password) VALUES (?, ?, ?)`;
    const [result] = await database_1.default.query(query, [username, name, password]);
    return result;
}
async function getUserByUsername(username) {
    const checkQuery = `SELECT * FROM ${constant_value_1.SQLTable.Users} WHERE username = ?`;
    const [rows] = await database_1.default.query(checkQuery, [username]);
    return rows.length > 0 ? rows[0] : null;
}
async function getUserById(id) {
    const checkQuery = `SELECT * FROM ${constant_value_1.SQLTable.Users} WHERE id = ?`;
    const [rows] = await database_1.default.query(checkQuery, [id]);
    return rows.length > 0 ? rows[0] : null;
}
//# sourceMappingURL=user.service.js.map