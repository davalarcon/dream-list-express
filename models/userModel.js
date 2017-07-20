const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myUserSchema = new Schema (
  {
    fullName:{
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
