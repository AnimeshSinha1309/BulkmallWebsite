import { Request, Response } from 'express';

export interface IReviewService {
  dummyMessage(req: Request, res: Response): void; // TODO: Delete this
  listReviews(req: Request, res: Response): void;
  insertReview(req: Request, res: Response): void;
  deleteReview(req: Request, res: Response): void;
  updateReview(req: Request, res: Response): void;
}
