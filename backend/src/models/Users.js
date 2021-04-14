import { Schema as _Schema, model } from 'mongoose';
import { genSalt, hash as _hash } from 'bcrypt';
const saltRounds = 10;
var Schema = _Schema;

var users = new Schema({
  email: { type: String, required: true, unique: true, trim: true },
  mobile: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  name: { type: String, required: true },
  images: { type: String, trim: true },
  role: { type: String, default: 'user', trim: true },
  createdAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

users.pre('save', function (next) {
  var self = this;
  genSalt(saltRounds, function (err, salt) {
    _hash(self.password, salt, function (err, hash) {
      self.password = hash;
      return next();
    });
  });
});

export const usersModel = model('users', users);
