"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findGame = findGame;
exports.updateGame = updateGame;
exports.createGame = createGame;
exports.getGameById = getGameById;
const constant_value_1 = require("../constant.value");
const database_1 = __importDefault(require("../database"));
const utils_1 = require("../helpers/utils");
async function findGame(user, organId, level) {
    const checkQuery = `SELECT * FROM ${constant_value_1.SQLTable.Games} WHERE 
                        organ_id = ? AND level = ? AND opponent_id IS NULL`;
    const [rows] = await database_1.default.query(checkQuery, [organId, level]);
    return rows.length > 0 ? rows[0] : null;
}
async function updateGame(game) {
    const updateQuery = `UPDATE ${constant_value_1.SQLTable.Games} 
                         SET opponent_id = ?, time_second = ?, player_win = ?
                         WHERE id = ?`;
    await database_1.default.query(updateQuery, [game.opponent_id, game.time_second, game.player_win, game.id]);
    return game;
}
async function createGame(user, organId, level) {
    const seed = (0, utils_1.random)();
    const query = `INSERT INTO ${constant_value_1.SQLTable.Games}
                   (user_id, organ_id, level, seed) VALUES
                   (?, ?, ?, ?)`;
    const [result] = await database_1.default.query(query, [user.id, organId, level, seed]);
    const gameData = {
        id: result.insertId,
        user_id: user.id,
        organ_id: organId,
        level: level,
        seed: seed,
        time_second: 0,
    };
    return gameData;
}
async function getGameById(id) {
    const getQuery = `SELECT * FROM ${constant_value_1.SQLTable.Games}
                      WHERE id = ?`;
    const [rows] = await database_1.default.query(getQuery, [id]);
    return rows.length > 0 ? rows[0] : null;
}
//# sourceMappingURL=game.services.js.map