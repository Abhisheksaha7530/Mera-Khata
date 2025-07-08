import mongoose from 'mongoose';

const entrySchema = new mongoose.Schema({
  item: { type: String, required: true },
  quantity: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true, min: 0 },
  customer: { type: String, required: true },
  paid: { type: Boolean, default: false },
  date: { type: Date, default: Date.now },
});

entrySchema.virtual('total').get(function () {
  return this.quantity * this.price;
});
entrySchema.set('toJSON', { virtuals: true });

export default mongoose.model('Entry', entrySchema);
