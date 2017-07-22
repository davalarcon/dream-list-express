const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myUserSchema = new Schema (
  {
    firstName:{
      type: String,
      require: true
    },
    lastName:{
      type: String,
      require: true
    },
    birthday:{
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
      },
    encryptedPassword:{
      type: String,
      require: true
    },
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('User', myUserSchema);

module.exports = UserModel;
