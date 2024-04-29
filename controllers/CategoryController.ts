import { Request, Response } from 'express';
import { CategoryService } from '../services/CategoryService';
import { Category } from '../models/Category';

const categoryService = new CategoryService();

// Rota para criação de uma nova categoria
export async function createCategory(req: Request, res: Response) {
  try {
    const { name, color, userId } = req.body;
    const newCategory = await categoryService.createCategory(new Category(0, name, color, userId));
    res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Rota para listar todas as categorias de um usuário
export async function getCategoriesByUserId(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);
    const categories = await categoryService.getCategoriesByUserId(userId);
    res.json(categories);
  } catch (error) {
    console.error('Error getting categories by user id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Rota para obter detalhes de uma categoria específica
export async function getCategoryById(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id);
    const category = await categoryService.getCategoryById(categoryId);
    if (!category) {
      res.status(404).json({ error: 'Category not found' });
      return;
    }
    res.json(category);
  } catch (error) {
    console.error('Error getting category by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Rota para atualizar uma categoria existente
export async function updateCategory(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id);
    const { name, color, userId } = req.body;
    const updatedCategory = await categoryService.updateCategory(categoryId, new Category(categoryId, name, color, userId));
    res.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Rota para excluir uma categoria
export async function deleteCategory(req: Request, res: Response) {
  try {
    const categoryId = parseInt(req.params.id);
    await categoryService.deleteCategory(categoryId);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
