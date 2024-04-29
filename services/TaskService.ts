import pool from '../db';
import { Task } from '../models/Task';

export class TaskService {
  async createTask(newTask: Task): Promise<Task> {
    const { title, description, creationDate, completionDate, type, category, status, userId } = newTask;
    const [result] = await pool.query(
      'INSERT INTO tasks (title, description, creation_date, completion_date, type, category, status, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, creationDate, completionDate, type, category, status, userId]
    );
    const insertedTaskId = result.insertId;
    return { ...newTask, id: insertedTaskId };
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [userId]);
    return rows as Task[];
  }

  async getTaskById(taskId: number): Promise<Task | null> {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
    return rows.length ? rows[0] : null;
  }

  async updateTask(taskId: number, updatedTask: Task): Promise<Task | null> {
    const { title, description, creationDate, completionDate, type, category, status, userId } = updatedTask;
    await pool.query(
      'UPDATE tasks SET title = ?, description = ?, creation_date = ?, completion_date = ?, type = ?, category = ?, status = ?, user_id = ? WHERE id = ?',
      [title, description, creationDate, completionDate, type, category, status, userId, taskId]
    );
    return { ...updatedTask, id: taskId };
  }

  async deleteTask(taskId: number): Promise<void> {
    await pool.query('DELETE FROM tasks WHERE id = ?', [taskId]);
  }

  async filterTasksByCategory(categoryId: number, userId: number): Promise<Task[]> {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE category = ? AND user_id = ?', [categoryId, userId]);
    return rows as Task[];
  }

  async getCompletedTasks(userId: number): Promise<Task[]> {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE status = "concluída" AND user_id = ?', [userId]);
    return rows as Task[];
  }

  async getPendingTasks(userId: number): Promise<Task[]> {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE status = "pendente" AND user_id = ?', [userId]);
    return rows as Task[];
  }

  async getTasksDueInPeriod(userId: number, startDate: string, endDate: string): Promise<Task[]> {
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ? AND completion_date BETWEEN ? AND ?',
      [userId, startDate, endDate]
    );
    return rows as Task[];
  }

  async countTasksByUserId(userId: number): Promise<number> {
    const [rows] = await pool.query('SELECT COUNT(*) AS taskCount FROM tasks WHERE user_id = ?', [userId]);
    return rows[0].taskCount as number;
  }

  async getLatestTaskByUserId(userId: number): Promise<Task | null> {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ? ORDER BY creation_date DESC LIMIT 1', [userId]);
    return rows.length ? rows[0] as Task : null;
  }

  async calculateAverageCompletion(userId: number): Promise<number> {
    const [rows] = await pool.query(
      'SELECT AVG(TIMESTAMPDIFF(DAY, creation_date, completion_date)) AS avgCompletion FROM tasks WHERE user_id = ? AND status = "concluída"',
      [userId]
    );
    return rows[0].avgCompletion as number;
  }

  async getLongestDescriptionTask(userId: number): Promise<Task | null> {
    const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY LENGTH(description) DESC LIMIT 1',
      [userId]
    );
    return rows.length ? rows[0] as Task : null;
  }

  async groupTasksByCategory(userId: number): Promise<{ [key: string]: Task[] }> {
    const [rows] = await pool.query(
      'SELECT category, JSON_ARRAYAGG(title) AS tasks FROM tasks WHERE user_id = ? GROUP BY category',
      [userId]
    );
    const groupedTasks: { [key: string]: Task[] } = {};
    rows.forEach((row: any) => {
      groupedTasks[row.category] = JSON.parse(row.tasks).map((title: string) => ({ title }));
    });
    return groupedTasks;
  }

  async getOldestTaskByUserId(userId: number): Promise<Task | null> {
    const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ? ORDER BY creation_date ASC LIMIT 1', [userId]);
    return rows.length ? rows[0] as Task : null;
  }
}
