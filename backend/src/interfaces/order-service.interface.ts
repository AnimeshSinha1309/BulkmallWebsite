import { Request, Response } from 'express';

export interface IOrderService {
  listOrders(req: Request, res: Response): void;
  insertOrder(req: Request, res: Response): void;
  deleteOrder(req: Request, res: Response): void;
  updateOrder(req: Request, res: Response): void;
  detailOrder(req: Request, res: Response): void;
  detailOrderById(req: Request, res: Response): void;
}
