import { Application } from 'express';
import { IUserService } from './interfaces/user-service.interface';
import { IOrderService } from './interfaces/order-service.interface';
import { IProductService } from './interfaces/product-service.interface';
import { IReviewService } from './interfaces/review-service.interface';

export class Controller {
  constructor(private app: Application, private userService: IUserService,
    private orderService: IOrderService, private reviewService: IReviewService,
    private productService: IProductService) {
    this.routes();
  }

  public routes() {
    this.app.route('/user/dummy').get(this.userService.dummyMessage);
    this.app.route('/user/list').get(this.userService.listUsers);
    this.app.route('/user/insert').post(this.userService.insertUser);
    this.app
      .route('/user/edit/:id')
      .delete(this.userService.deleteUser)
      .put(this.userService.updateUser);
    this.app.route('/product/dummy').get(this.productService.dummyMessage);
    this.app.route('/product/list').get(this.productService.listProducts);
    this.app.route('/product/insert').post(this.productService.insertProduct);
    this.app
      .route('/product/edit/:id')
      .delete(this.productService.deleteProduct)
      .put(this.productService.updateProduct);
    this.app.route('/order/dummy').get(this.orderService.dummyMessage);
    this.app.route('/order/list').get(this.orderService.listOrders);
    this.app.route('/order/insert').post(this.orderService.insertOrder);
    this.app
      .route('/order/edit/:id')
      .delete(this.orderService.deleteOrder)
      .put(this.orderService.updateOrder);
    this.app.route('/review/dummy').get(this.reviewService.dummyMessage);
    this.app.route('/review/list').get(this.reviewService.listReviews);
    this.app.route('/review/insert').post(this.reviewService.insertReview);
    this.app
      .route('/review/edit/:id')
      .delete(this.reviewService.deleteReview)
      .put(this.reviewService.updateReview);
  }
}
