import { SQLTable } from "../constant.value";
import pool from "../database";
import { random } from "../helpers/utils";
import { User } from "./user.service";

export type Game = {
    id: number,
    user_id: number,
    opponent_id?: number,
    organ_id: number,
    level: number,
    time_second: number,
    seed: number
    player_win?: boolean
}

export async function findGame(user: User, organId: number, level: number): Promise<Game | null> {
    const checkQuery = `SELECT * FROM ${SQLTable.Games} WHERE 
                        organ_id = ? AND level = ? AND opponent_id IS NULL`;
    const [rows]: any = await pool.query(checkQuery, [organId, level]);
    return rows.length > 0 ? rows[0] : null;
}

export async function updateGame(game: Game): Promise<Game> {
    const updateQuery = `UPDATE ${SQLTable.Games} 
                         SET opponent_id = ?, time_second = ?, player_win = ?
                         WHERE id = ?`;
    await pool.query(updateQuery, [game.opponent_id, game.time_second, game.player_win, game.id]);
    return game;
}

export async function createGame(user: User, organId: number, level: number): Promise<Game> {
    const seed = random();

    const query = `INSERT INTO ${SQLTable.Games}
                   (user_id, organ_id, level, seed) VALUES
                   (?, ?, ?, ?)`;
    const [result]: any = await pool.query(query, [user.id, organId, level, seed]);

    const gameData: Game = {
        id: result.insertId,
        user_id: user.id,
        organ_id: organId,
        level: level,
        seed: seed,
        time_second: 0,
    }

    return gameData;
}

export async function getGameById(id: number): Promise<Game | null> {
    const getQuery = `SELECT * FROM ${SQLTable.Games}
                      WHERE id = ?`;
    const [rows]: any = await pool.query(getQuery, [id]);

    return rows.length > 0 ? rows[0] : null;
}