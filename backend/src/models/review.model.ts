import mongoose, { Schema } from 'mongoose';

export const ReviewSchema = new mongoose.Schema(
  {
    userId: String,
    productId: String,
    orderId: String,
    text: String,
    stars: Number,
  },
  { versionKey: false }
);

ReviewSchema.set('toJSON', {
  transform: function (doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const Review = mongoose.model('Review', ReviewSchema);
