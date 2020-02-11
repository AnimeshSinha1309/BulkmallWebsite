import { Application } from 'express';
import { IUserService } from './interfaces/user-service.interface';

export class Controller {
  constructor(private app: Application, private userService: IUserService) {
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
  }
}
