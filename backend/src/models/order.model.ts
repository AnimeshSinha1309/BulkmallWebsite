import mongoose, { Schema } from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    productId: String,
    userId: String,
    quantity: Number,
    price: Number,
  },
  { versionKey: false }
);

OrderSchema.set('toJSON', {
  transform: function (doc: any, ret: any, options: any) {
    ret.id = ret._id;
    delete ret._id;
  }
});

export const Order = mongoose.model('Order', OrderSchema);
