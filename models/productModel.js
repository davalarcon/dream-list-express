const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductSchema = new Schema(
  {
    name: {type: String, require: true},
    brand: {type: String, require: true},
    model: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},

    ownerId: {type: Number, require: true},
    contributorsId: {type: Number, require: true},
    totalContribution: {type: Number, require: true},
  }
);


  const ProductModel = mongoose.model('Product', myUserSchema);

  module.exports = ProductModel;
