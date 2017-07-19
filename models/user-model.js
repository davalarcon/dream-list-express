const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myUserSchema = new Schema(
  {
    name: {type: String, require: true},
    lastName: {type: String, require: true},
    email: {type: String, require: true},
    birthday: {type: Date },
    encryptedPassword: { type: String, require: true },

    googleId: {type: String},
    facebookId: {type: String},
    role: { type: String, default: 'Client'},
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', myUserSchema);

module.exports = UserModel;
