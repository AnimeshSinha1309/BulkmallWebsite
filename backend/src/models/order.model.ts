import mongoose, { Schema, Mongoose } from 'mongoose';

export const OrderSchema = new mongoose.Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    quantity: Number,
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
