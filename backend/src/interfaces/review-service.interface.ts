import { Request, Response } from 'express';

export interface IReviewService {
  listReviews(req: Request, res: Response): void;
  insertReview(req: Request, res: Response): void;
  deleteReview(req: Request, res: Response): void;
  updateReview(req: Request, res: Response): void;
}
