import { SQLTable } from "../constant.value";
import pool from "../database";


export type User = {
    id: number,
    name: string,
    username: string,
    password?: string,
}

export async function newUser(username: string, name: string, password: string) {
    const query = `INSERT INTO ${SQLTable.Users} (username, name, password) VALUES (?, ?, ?)`;
    const [result] = await pool.query(query, [username, name, password]);
    return result;
}

export async function getUserByUsername(username: string): Promise<User | null> {
    const checkQuery = `SELECT * FROM ${SQLTable.Users} WHERE username = ?`;
    const [rows]: any = await pool.query(checkQuery, [username]);

    return rows.length > 0 ? rows[0] as User : null;
}

export async function getUserById(id: number): Promise<User | null> {
    const checkQuery = `SELECT * FROM ${SQLTable.Users} WHERE id = ?`;
    const [rows]: any = await pool.query(checkQuery, [id]);

    return rows.length > 0 ? rows[0] as User : null;
}