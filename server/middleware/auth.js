const Account = require('../models/accountModel');

let auth = (req, res, next) => {
  let { customerID, accountNumber } = req.body;
  Account.findOne({ customerID: customerID, accountNumber: accountNumber }, (err, acc) => {
    if (err) throw err;
    if (!acc)
      return res.json({
        success: false,
        message: 'Auth failed, account not found',
      });
    next();
  });
};

module.exports = { auth };
