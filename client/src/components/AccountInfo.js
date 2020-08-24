import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  paper: {
    maxWidth: 450,
  },
});

function AccountInfo({ accountInfo }) {
  const classes = useStyles();

  return (
    accountInfo !== null ?? (
      <div>
        <TableContainer component={Paper} className={classes.paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell align="right">Balance&nbsp;(CAD)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {accountInfo.map((account) => (
                <TableRow>
                  <TableCell component="th" scope="row">
                    {account.customerName}
                  </TableCell>
                  <TableCell align="right">{account.balance}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  );
}

export default AccountInfo;
