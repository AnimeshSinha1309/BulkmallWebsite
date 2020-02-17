import { MongooseDocument } from 'mongoose';
import { Request, Response } from 'express';

import { IOrderService } from '../interfaces/order-service.interface';
import { Order } from '../models/order.model';
import { Product } from '../models/product.model';
import async from "async";

export class OrderService implements IOrderService {
  public listOrders(req: Request, res: Response) {
    Order.find({}, (error: Error, order: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(order);
    });
  }

  public insertOrder(req: Request, res: Response) {
    const newOrder = new Order(req.body);
    newOrder.save((error: Error, order: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(order);
    });
  }

  public deleteOrder(req: Request, res: Response) {
    const orderID = req.params.id;
    Order.findByIdAndDelete(orderID, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }
      const message = deleted ? 'Deleted successfully' : 'Order not found :(';
      res.status(200).send(message);
    });
  }

  public updateOrder(req: Request, res: Response) {
    const orderId = req.params.id;
    Order.findByIdAndUpdate(
      orderId,
      req.body,
      (error: Error, order: any) => {
        if (error) {
          res.send(error);
        }
        const message = order
          ? 'Updated successfully'
          : 'Order not found :(';
        res.send(message);
      }
    );
  }

  public detailOrder(req: Request, res: Response) {
    Order.find({ userId: req.body.userId })
      .populate('productId')
      .then((order: MongooseDocument[]) => {
        res.json(order);
      });
  };

  public detailOrderById(req: Request, res: Response) {
    Order.find({ _id: req.params.id })
      .populate({ path: 'productId', populate: { path: 'sellerId', model: 'User' } })
      .populate('userId')
      .then((order: MongooseDocument[]) => {
        res.json(order);
      });
  };
}
