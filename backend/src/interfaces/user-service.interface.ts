import { Request, Response } from 'express';

export interface IUserService {
  listUsers(req: Request, res: Response): void;
  insertUser(req: Request, res: Response): void;
  deleteUser(req: Request, res: Response): void;
  updateUser(req: Request, res: Response): void;
  register(req: Request, res: Response): void;
  login(req: Request, res: Response): void;
}
