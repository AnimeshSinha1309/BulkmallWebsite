import { Application } from 'express';
import { IUserService } from './interfaces/user-service.interface';
import { IOrderService } from './interfaces/order-service.interface';
import { IProductService } from './interfaces/product-service.interface';

export class Controller {
  constructor(private app: Application, private userService: IUserService,
    private orderService: IOrderService, private productService: IProductService) {
    this.routes();
  }

  public routes() {
    // Register and Login
    this.app.route('/login').post(this.userService.login);
    this.app.route('/register').post(this.userService.register);
    // CRUD Operations routing
    this.app.route('/user/list').get(this.userService.listUsers);
    this.app.route('/user/insert').post(this.userService.insertUser);
    this.app
      .route('/user/edit/:id')
      .delete(this.userService.deleteUser)
      .put(this.userService.updateUser);
    this.app.route('/product/list').get(this.productService.listProducts);
    this.app.route('/product/insert').post(this.productService.insertProduct);
    this.app
      .route('/product/edit/:id')
      .delete(this.productService.deleteProduct)
      .put(this.productService.updateProduct);
    this.app.route('/order/list').get(this.orderService.listOrders);
    this.app.route('/order/insert').post(this.orderService.insertOrder);
    this.app
      .route('/order/edit/:id')
      .delete(this.orderService.deleteOrder)
      .put(this.orderService.updateOrder);
    // Custom Queries
    this.app
      .route('/product/seller/')
      .post(this.productService.listProductsBySeller);
    this.app
      .route('/order/detail/')
      .post(this.orderService.detailOrder);
    this.app
      .route('/product/id/:id')
      .get(this.productService.detailProductById);
    this.app
      .route('/order/id/:id')
      .get(this.orderService.detailOrderById);
    // Push in ratings and reviews
    this.app
      .route('/product/review/:id')
      .post(this.productService.pushReview)
    this.app
      .route('/user/rating/:id')
      .post(this.userService.pushRating)
  }
}
