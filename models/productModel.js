const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myProductSchema = new Schema(
  {
    name: {type: String, require: true},
    type: {type: String},
    sku: {type: Number},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    image: {type: String},

    ownerId: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: 'User'
    },
    contributorsId: {type: Number, require: true},
    totalContribution: {type: Number, require: true},
  }
);


  const ProductModel = mongoose.model('Product', myProductSchema);

  module.exports = ProductModel;
