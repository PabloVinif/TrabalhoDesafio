import pool from '../db';
import { Category } from '../models/Category';

export class CategoryService {
  async createCategory(category: Category): Promise<Category> {
    const { name, color, userId } = category;
    const [result] = await pool.query('INSERT INTO categories (name, color, user_id) VALUES (?, ?, ?)', [name, color, userId]);
    const insertedCategoryId = result.insertId;
    return { ...category, id: insertedCategoryId };
  }

  async getCategoriesByUserId(userId: number): Promise<Category[]> {
    const [rows] = await pool.query('SELECT * FROM categories WHERE user_id = ?', [userId]);
    return rows as Category[];
  }

  async getCategoryById(id: number): Promise<Category | null> {
    const [rows] = await pool.query('SELECT * FROM categories WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
  }

  async updateCategory(id: number, newCategory: Category): Promise<Category | null> {
    const { name, color, userId } = newCategory;
    await pool.query('UPDATE categories SET name = ?, color = ?, user_id = ? WHERE id = ?', [name, color, userId, id]); 
    return { ...newCategory, id };
  }

  async deleteCategory(id: number): Promise<void> {
    await pool.query('DELETE FROM categories WHERE id = ?', [id]);
  }
}
