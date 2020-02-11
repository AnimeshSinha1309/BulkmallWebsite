import { Document, Mongoose, MongooseDocument } from 'mongoose';
import { Request, Response } from 'express';

import { IUserService } from '../interfaces/user-service.interface';
import { User } from '../models/user.model';
import { WELCOME_MESSAGE } from '../constants/global.constants';

export class UserService implements IUserService {
  public dummyMessage(req: Request, res: Response) {
    res.status(200).send(WELCOME_MESSAGE);
  }

  public listUsers(req: Request, res: Response) {
    User.find({}, (error: Error, user: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(user);
    });
  }

  public insertUser(req: Request, res: Response) {
    const newUser = new User(req.body);
    newUser.save((error: Error, user: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(user);
    });
  }

  public deleteUser(req: Request, res: Response) {
    const userID = req.params.id;
    User.findByIdAndDelete(userID, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }
      const message = deleted ? 'Deleted successfully' : 'User not found :(';
      res.status(200).send(message);
    });
  }

  public updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    User.findByIdAndUpdate(
      userId,
      req.body,
      (error: Error, user: any) => {
        if (error) {
          res.send(error);
        }
        const message = user
          ? 'Updated successfully'
          : 'User not found :(';
        res.send(message);
      }
    );
  }
}
