import { Schema, model } from 'mongoose';

const fonts = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false },
  fonts: { type: Array },
  status: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const fontsModel = model('fonts', fonts);
