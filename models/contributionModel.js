const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myContributionSchema = new Schema(
  {
    to: {type: Number, require: true},
    from: {type: Number, require: true},
    amount: {type: Number, require: true},

  }
);


  const ContributionModel = mongoose.model('Contribution', myContributionSchema);

  module.exports = ContributionModel;
