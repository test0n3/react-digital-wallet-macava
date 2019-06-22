/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { useTransactions } from "../selectors";

// {date} comes as a number

function Transactions({ date }) {
  const transactions = useTransactions();
  console.log("Passed date:", new Date(date));
  console.log("typeof passed date:", typeof new Date(date));
  console.log("TransactionManager", transactionManager(date));
  console.log("Balance alone:", balance());
  console.log("Initial Balance alone:", initialBalance(date));
  console.log("Complete balance:", initialBalance(date) + balance());

  function startMonth(currentDate) {
    // return first day of required month
    const initialMonth = new Date(currentDate).setDate(1);
    // console.log("Start month:", new Date(initialMonth));
    return initialMonth;
  }

  function nextMonth(currentDate) {
    // returns first day of next month
    const firstDay = new Date(currentDate).setDate(1);
    const nextMonth = new Date(firstDay).setMonth(
      new Date(firstDay).getMonth() + 1
    );
    // console.log("Next Month:", new Date(firstDay));
    return nextMonth;
  }
  function formatTransactionDate(transacDate) {
    // returns date like YYYY/MM/DD
    const transDate = new Date(transacDate);
    const formatted =
      transDate.getFullYear() +
      "/" +
      ((transDate.getMonth() + 1).toString().length === 1
        ? "0" + (transDate.getMonth() + 1)
        : transDate.getMonth() + 1) +
      "/" +
      (transDate.getDate().toString().length === 1
        ? "0" + transDate.getDate()
        : transDate.getDate());
    // console.log("formatted:", formatted);

    return formatted;
  }

  function initialBalance(month) {
    // calculate balances until initialDate

    return transactions
      .filter(transaction => transaction.id < month)
      .reduce((accum, transaction) => {
        return accum + transaction.amount;
      }, 0);
  }

  function balance() {
    return transactionManager(date).reduce((accum, transaction) => {
      return accum + transaction.amount;
    }, 0);
  }

  function transactionManager(selectedDate) {
    // filters transactions for initialDate and nextMonth
    const startDate = startMonth(selectedDate);
    const lastDate = nextMonth(selectedDate);
    // console.log(
    //   `transactionManager\nstartDate: ${new Date(
    //     startDate
    //   )}\nlastDate: ${new Date(lastDate)}`
    // );
    return transactions.filter(transaction => {
      // console.log(
      //   `transaction Id: ${transaction.id}\n transaction amount: ${
      //     transaction.amount
      //   } transaction category: ${transaction.category}`
      // );
      return transaction.id >= startDate && transaction.id < lastDate;
    });
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <span css={{ fontWeight: "bold" }}>Month:</span>
            </th>
            <td colSpan="2">
              {String(
                new Date(date).toLocaleDateString("default", {
                  month: "long"
                }) +
                  " " +
                  new Date(date).getFullYear()
              )}
            </td>
          </tr>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{formatTransactionDate(startMonth(date))}</td>
            <td>Initial Balance</td>
            <td>{initialBalance(startMonth(date))}</td>
          </tr>
          {transactionManager(date).map((day, index) => {
            return (
              <tr key={index}>
                <td>{formatTransactionDate(day.id)}</td>
                <td>{day.category}</td>
                <td>{day.amount}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <span css={{ fontWeight: "bold" }}>Balance:</span>
            </td>
            <td>In process</td>
          </tr>
        </tfoot>
      </table>
      <table />
      {/* <button type="button" onChange={onButtonReturn}>
      Return
    </button>*/}
    </>
  );
}
export default Transactions;
