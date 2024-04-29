import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { User } from '../models/User';

const userService = new UserService();

// Rota para criação de um novo usuário
export async function createUser(req: Request, res: Response) {
  try {
    const { username, weight, password, email } = req.body;
    const newUser = await userService.createUser(new User(0, username, weight, password, email));
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Rota para listar todas os usuários
export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (error) {
    console.error('Error getting all users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Rota para obter detalhes de um usuário específico
export async function getUserById(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.getUserById(userId);
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user by id:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Rota para atualizar um usuário existente
export async function updateUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    const { username, weight, password, email } = req.body;
    const updatedUser = await userService.updateUser(userId, new User(userId, username, weight, password, email));
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Rota para excluir um usuário
export async function deleteUser(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.id);
    await userService.deleteUser(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
