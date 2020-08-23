import React from 'react';

function AccountInfo({ accountInfo }) {
  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{accountInfo.customerName}</td>
            <td>{accountInfo.balance}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default AccountInfo;
