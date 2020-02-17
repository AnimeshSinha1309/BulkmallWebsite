import { Request, Response } from 'express';

export interface IProductService {
  listProducts(req: Request, res: Response): void;
  insertProduct(req: Request, res: Response): void;
  deleteProduct(req: Request, res: Response): void;
  updateProduct(req: Request, res: Response): void;
  listProductsBySeller(req: Request, res: Response): void;
  detailProductById(req: Request, res: Response): void;
}
