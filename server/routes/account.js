const express = require('express');
const router = express.Router();
const Account = require('../models/accountModel');
const { auth } = require('../middleware/auth');

const exchangeRate = [
  {
    currency: 'USD',
    rate: 0.5,
  },
  {
    currency: 'MXN',
    rate: 10,
  },
];

router.get('/:id', (req, res) => {
  Account.find({ customerID: req.params.id }, (err, info) => {
    if (err) {
      res.status(404).send('No accounts were found!');
    } else {
      res.status(200).send(
        info.map((account) => ({
          customerName: account.customerName,
          accountNumber: account.accountNumber,
          balance: account.balance,
        }))
      );
    }
  });
});

router.post('/deposit', auth, (req, res) => {
  let { customerID, accountNumber, amount, currency } = req.body;
  if (currency !== 'CAD') {
    amount /= exchangeRate.find((element) => element.currency === currency).rate;
  }

  Account.findOneAndUpdate(
    { customerID: customerID, accountNumber: accountNumber },
    { $inc: { balance: amount } },
    { new: true },
    (err, acc) => {
      if (err) return res.send(err);
      res.status(200).json({
        success: true,
        account: acc,
      });
    }
  );
});

router.post('/withdraw', auth, (req, res) => {
  let { customerID, accountNumber, amount, currency } = req.body;
  if (currency !== 'CAD') {
    amount /= exchangeRate.find((element) => element.currency === currency).rate;
  }

  Account.findOneAndUpdate(
    { customerID: customerID, accountNumber: accountNumber },
    { $inc: { balance: amount * -1 } },
    { new: true },
    (err, acc) => {
      if (err) return res.send(err);
      res.status(200).json({
        success: true,
        account: acc,
      });
    }
  );
});

router.post('/transfer', auth, (req, res) => {
  let { customerID, accountNumber, accountTo, amount } = req.body;

  Account.findOneAndUpdate(
    { customerID: customerID, accountNumber: accountNumber },
    { $inc: { balance: amount * -1 } },
    { new: true },
    (err, acc1) => {
      if (err) return res.send(err);
      Account.findOneAndUpdate(
        { accountNumber: accountTo },
        { $inc: { balance: amount } },
        { new: true },
        (err, acc2) => {
          if (err) return res.send(err);
          res.status(200).json({
            success: true,
            account: [acc1, acc2],
          });
        }
      );
    }
  );
});

module.exports = router;
