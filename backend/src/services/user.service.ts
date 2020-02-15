import express from 'express'
import { Document, Mongoose, MongooseDocument } from 'mongoose';
import { Request, Response } from 'express';

import { IUserService } from '../interfaces/user-service.interface';
import { User } from '../models/user.model';
import { WELCOME_MESSAGE } from '../constants/global.constants';

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const router = express.Router();
import { validateRegisterInput } from '../validators/register.service'
import { validateLoginInput } from '../validators/login.service'

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
    console.log(newUser)
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

  public register(req: Request, res: Response) {
    console.log("Inserting: ", req.body);
    const error: string = validateRegisterInput(req.body);
    // Check validation
    if (error.length != 0) {
      return res.status(400).json({ error: error });
    }
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ error: "Email already exists" });
      } else {
        const newUser: any = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });
        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user: any) => res.json(user))
              .catch((err: any) => console.log(err));
          });
        });
      }
    });
  }

  public login(req: Request, res: Response) {

  }
}
