import { Document, Mongoose, MongooseDocument } from 'mongoose';
import { Request, Response } from 'express';

import { IProductService } from '../interfaces/product-service.interface';
import { Product } from '../models/product.model';
import { WELCOME_MESSAGE } from '../constants/global.constants';

export class ProductService implements IProductService {
  public listProducts(req: Request, res: Response) {
    Product.find({}, (error: Error, product: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(product);
    });
  }

  public listProductsBySeller(req: Request, res: Response) {
    Product.find({ sellerId: req.body.sellerId }, (error: Error, product: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(product);
    });
  }

  public insertProduct(req: Request, res: Response) {
    if (req.body.sellerId == undefined) {
      res.send("Please send your ID too, Authentication Error");
    }
    const newProduct = new Product(req.body);
    newProduct.save((error: Error, product: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(product);
    });
  }

  public deleteProduct(req: Request, res: Response) {
    const productID = req.params.id;
    Product.findByIdAndDelete(productID, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }
      const message = deleted ? 'Deleted successfully' : 'Product not found :(';
      res.status(200).send(message);
    });
  }

  public updateProduct(req: Request, res: Response) {
    const productId = req.params.id;
    Product.findByIdAndUpdate(
      productId,
      req.body,
      (error: Error, product: any) => {
        if (error) {
          res.send(error);
        }
        const message = product
          ? 'Updated successfully'
          : 'Product not found :(';
        res.send(message);
      }
    );
  }

  public detailProductById(req: Request, res: Response) {
    Product.find({ _id: req.params.id })
      .then((order: MongooseDocument[]) => {
        res.json(order);
      });
  };
}
