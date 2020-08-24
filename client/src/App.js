import React, { useState, useRef } from 'react';
import AccountInfo from './components/AccountInfo';
import './App.css';
import axios from 'axios';

function App() {
  const [customerID, setId] = useState('');
  const [account, setAccount] = useState('');
  const [amount, setAmount] = useState(0);
  const [accountTo, setTo] = useState('');
  const [amountTransfer, setTransfer] = useState(0);
  const [accountInfo, setInfo] = useState(null);
  const [currencyGroup, setCurrency] = useState([
    {
      tag: 'CAD',
      active: true,
    },
    {
      tag: 'USD',
      active: false,
    },
    {
      tag: 'MXN',
      active: false,
    },
  ]);

  const onCurrency = useRef('CAD');

  const onChangeID = (e) => {
    setId(e.target.value);
  };

  const onChangeAccount = (e) => {
    setAccount(e.target.value);
  };

  const onChangeAmount = (e) => {
    setAmount(e.target.value);
  };

  const onChangeTo = (e) => {
    setTo(e.target.value);
  };
  const onChangeTransfer = (e) => {
    setTransfer(e.target.value);
  };

  const handleRadio = (e) => {
    setCurrency(
      currencyGroup.map((currency) =>
        currency.tag === e.target.value
          ? { ...currency, active: true }
          : { ...currency, active: false }
      )
    );
    onCurrency.current = e.target.value;
  };

  const getInfo = () => {
    axios.get(`/api/account/${customerID}`).then(({ data }) => {
      console.log(data);
      setInfo(data);
    });
  };

  const deposit = () => {
    axios
      .post('/api/account/deposit', {
        customerID: customerID,
        accountNumber: account,
        amount: parseInt(amount),
        currency: onCurrency.current,
      })
      .then(({ data }) => {
        if (data.success) console.log(data.account);
        else console.log(data.message);
      });
  };

  const withdraw = () => {
    axios
      .post('/api/account/withdraw', {
        customerID: customerID,
        accountNumber: account,
        amount: parseInt(amount),
        currency: onCurrency.current,
      })
      .then(({ data }) => {
        if (data.success) console.log(data.account);
        else console.log(data.message);
      });
  };

  const transfer = () => {
    axios
      .post('/api/account/transfer', {
        customerID: customerID,
        accountNumber: account,
        accountTo: accountTo,
        amount: parseInt(amountTransfer),
      })
      .then(({ data }) => {
        if (data.success) console.log(data.account);
        else console.log(data.message);
      });
  };

  return (
    <>
      <div>
        <label>Customer ID </label>
        <input
          name="customerID"
          placeholder="Customer ID"
          onChange={onChangeID}
          value={customerID}
        />
        <button onClick={getInfo}>Get Account Info</button>
      </div>
      <div>
        <label>Account# </label>
        <input
          name="account"
          placeholder="Account Number"
          onChange={onChangeAccount}
          value={account}
        />
      </div>
      <div>
        <label>Amount </label>
        <input name="amount" placeholder="Amount" onChange={onChangeAmount} value={amount} />
        {currencyGroup.map((currency) => (
          <label key={currency.tag}>
            <input
              type="radio"
              name={currency.tag}
              value={currency.tag}
              checked={currency.active}
              onChange={handleRadio}
            />
            {currency.tag}
          </label>
        ))}
        <button onClick={deposit}>Deposit</button>
        <button onClick={withdraw}>Withdraw</button>
      </div>
      <div>
        <label>Transfer Money To</label>
        <input name="accTo" placeholder="To" onChange={onChangeTo} value={accountTo} />
        <label> Amount </label>
        <input
          name="amountTransfer"
          placeholder="Amount"
          onChange={onChangeTransfer}
          value={amountTransfer}
        />
        <button onClick={transfer}>Transfer</button>
      </div>
      <div>
        <label>Result: </label>
      </div>
      <AccountInfo accountInfo={accountInfo} />
    </>
  );
}

export default App;
