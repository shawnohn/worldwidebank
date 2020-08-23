import React, { useState } from 'react';
import AccountInfo from './components/AccountInfo';
import './App.css';

function App() {
  const [inputs, setInputs] = useState({
    customerID: 'test',
    accountNumber: 'test',
  });
  const [accountInfo, setInfo] = useState({
    customerName: '',
    balance: 0,
  });

  const { customerID, accountNumber } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const getInfo = () => {
    const user = {
      customerName: 'shawn',
      balance: 0,
    };
    setInfo(user);
  };

  return (
    <>
      <div>
        <input name="customerID" placeholder="Customer ID" onChange={onChange} value={customerID} />
        <input
          name="accountNumber"
          placeholder="Account Number"
          onChange={onChange}
          value={accountNumber}
        />
        <button onClick={getInfo}>Get Account Info</button>
      </div>
      <AccountInfo accountInfo={accountInfo} />
    </>
  );
}

export default App;
