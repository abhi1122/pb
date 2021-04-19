import { Schema, model } from 'mongoose';

const templates = new Schema({
  name: { type: String, required: false, trim: true },
  category_id: { type: String, required: true, trim: true },
  url: { type: String, required: false },
  texts: [
    {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
      label: { type: String, required: true },
      font: { type: String, required: true },
      text: { type: String, required: true },
    },
  ],
  // logo: { type: [{ x: Number, y: Number }] },
  logo: [
    {
      x: { type: Number, required: true },
      y: { type: Number, required: true },
    },
  ],
  description: { type: String, required: false },
  status: { type: Boolean, default: false },
  file: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const templatesModel = model('templates', templates);
