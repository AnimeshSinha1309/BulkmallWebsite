import { Document, Mongoose, MongooseDocument } from 'mongoose';
import { Request, Response } from 'express';

import { IReviewService } from '../interfaces/review-service.interface';
import { Review } from '../models/review.model';
import { WELCOME_MESSAGE } from '../constants/global.constants';

export class ReviewService implements IReviewService {
  public listReviews(req: Request, res: Response) {
    Review.find({}, (error: Error, review: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(review);
    });
  }

  public insertReview(req: Request, res: Response) {
    const newReview = new Review(req.body);
    newReview.save((error: Error, review: MongooseDocument) => {
      if (error) {
        res.send(error);
      }
      res.json(review);
    });
  }

  public deleteReview(req: Request, res: Response) {
    const reviewID = req.params.id;
    Review.findByIdAndDelete(reviewID, (error: Error, deleted: any) => {
      if (error) {
        res.send(error);
      }
      const message = deleted ? 'Deleted successfully' : 'Review not found :(';
      res.status(200).send(message);
    });
  }

  public updateReview(req: Request, res: Response) {
    const reviewId = req.params.id;
    Review.findByIdAndUpdate(
      reviewId,
      req.body,
      (error: Error, review: any) => {
        if (error) {
          res.send(error);
        }
        const message = review
          ? 'Updated successfully'
          : 'Review not found :(';
        res.send(message);
      }
    );
  }
}
