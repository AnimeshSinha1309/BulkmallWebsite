import { Request, Response } from 'express';

export interface IProductService {
  dummyMessage(req: Request, res: Response): void; // TODO: Delete this
  listProducts(req: Request, res: Response): void;
  insertProduct(req: Request, res: Response): void;
  deleteProduct(req: Request, res: Response): void;
  updateProduct(req: Request, res: Response): void;
}
