import pool from '../db';
import { User } from '../models/User';

export class UserService {
  async createUser(user: User): Promise<User> {
    const { username, weight, password, email } = user;
    const [result] = await pool.query('INSERT INTO users (username, weight, password, email) VALUES (?, ?, ?, ?)', [username, weight, password, email]);
    const insertedUserId = result.insertId;
    return { ...user, id: insertedUserId };
  }

  async getAllUsers(): Promise<User[]> {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows as User[];
  }

  async getUserById(id: number): Promise<User | null> {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  }

  async updateUser(id: number, newUser: User): Promise<User | null> {
    const { username, weight, password, email } = newUser;
    await pool.query('UPDATE users SET username = ?, weight = ?, password = ?, email = ? WHERE id = ?', [username, weight, password, email, id]);
    return { ...newUser, id };
  }

  async deleteUser(id: number): Promise<void> {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  }
}
