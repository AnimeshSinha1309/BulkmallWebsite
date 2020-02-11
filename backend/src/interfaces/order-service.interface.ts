import { Request, Response } from 'express';

export interface IOrderService {
  dummyMessage(req: Request, res: Response): void; // TODO: Delete this
  listOrders(req: Request, res: Response): void;
  insertOrder(req: Request, res: Response): void;
  deleteOrder(req: Request, res: Response): void;
  updateOrder(req: Request, res: Response): void;
}
