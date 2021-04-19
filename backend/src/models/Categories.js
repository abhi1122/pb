import { Schema, model } from 'mongoose';

const categories = new Schema({
  parentId: {
    type: String,
    required: false,
    default: null,
  },
  childId: {
    type: String,
    required: false,
    default: null,
  },
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: false,
  },
  file: {
    type: Object,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  status: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export const categoriesModel = model('categories', categories);
