/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { useTransactions } from "../selectors";

// {date} comes as a string {YYYY-M}

function Transactions({ date }) {
  const transactions = useTransactions();

  function startMonth(currentDate) {
    // return first day of required month
    const initialMonth = new Date(currentDate).setDate(1);

    return initialMonth;
  }

  function nextMonth(currentDate) {
    // returns first day of next month
    const firstDay = new Date(currentDate).setDate(1);
    const nextMonth = new Date(firstDay).setMonth(
      new Date(firstDay).getMonth() + 1
    );

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
    // reduces amounts of current month's transactions
    return transactionManager(date).reduce((accum, transaction) => {
      return accum + transaction.amount;
    }, 0);
  }

  function transactionManager(selectedDate) {
    // filters transactions for initialDate and nextMonth
    const startDate = startMonth(selectedDate);
    const lastDate = nextMonth(selectedDate);

    return transactions.filter(transaction => {
      return transaction.id >= startDate && transaction.id < lastDate;
    });
  }

  function mostsTransactions() {
    // Groups by category and reduces amounts
    var newResult = [];
    var mosts = [];
    transactionManager(date).reduce((res, value) => {
      if (!res[value.category]) {
        res[value.category] = { category: value.category, amount: 0 };
        newResult.push(res[value.category]);
      }
      res[value.category].amount += value.amount;
      return res;
    }, []);

    const orderedData = newResult.sort((a, b) =>
      a.amount < b.amount ? 1 : -1
    );
    mosts.push(orderedData[0]);
    mosts.push(orderedData[orderedData.length - 1]);
    return mosts;
  }

  return (
    <>
      <section>
        <h2>Transactions of Month</h2>
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
              <td>{initialBalance(startMonth(date)) + balance()}</td>
            </tr>
          </tfoot>
        </table>
        <table />
      </section>
      <section>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Transactions</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {mostsTransactions().map((element, index) => {
              return (
                <tr key={index}>
                  <td>{element.category}</td>
                  <td>
                    {element.amount >= 0 ? "Most Ingresses" : "Most Withdraw"}
                  </td>
                  <td>{element.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </>
  );
}
export default Transactions;
