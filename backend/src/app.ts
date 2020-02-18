import { Application } from 'express';
import { Controller } from './main.controller';
import { UserService } from './services/user.service';
import { OrderService } from './services/order.service';
import { ProductService } from './services/product.service';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import { User } from './models/user.model';


class App {
  public app: Application;
  public userController: Controller;

  constructor() {
    this.app = express();
    this._setConfig();
    this._setMongoConfig();

    this.userController = new Controller(this.app, new UserService(),
      new OrderService(), new ProductService());
  }

  private _setConfig() {
    this.app.use(bodyParser.json({ limit: '50mb' }));
    this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
    this.app.use(cors());
  }

  private _setMongoConfig() {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/bulkmall', {
      useNewUrlParser: true
    });
  }
}

export default new App().app;
