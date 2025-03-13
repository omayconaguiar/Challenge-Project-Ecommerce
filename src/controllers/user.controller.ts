import { Router, Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../types/user.dto';

export const userRouter = Router();

// GET /api/users
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await userService.findAll();
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

// GET /api/users/:id
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id);
    const user = await userService.findOne(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

// POST /api/users
userRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData: CreateUserDTO = req.body;
    const newUser = await userService.create(userData);
    return res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/users/:id
userRouter.patch('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id);
    const updateData: UpdateUserDTO = req.body;
    const updatedUser = await userService.update(userId, updateData);
    return res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/users/:id
userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = parseInt(req.params.id);
    await userService.remove(userId);
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
});
