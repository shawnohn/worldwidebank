const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  customerID: { type: String, unique: true },
  customerName: { type: String, maxlength: 50 },
  accountNumber: { type: String, unique: true },
  balance: { type: Number, default: 0 },
});

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;
