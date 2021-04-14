import { Schema, model } from 'mongoose';

const categories = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  idDeleted: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const categoriesModel = model('categories', categories);
