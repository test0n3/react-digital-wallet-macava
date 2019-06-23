/** @jsx jsx */
import React from "react";
import { Link } from "@reach/router";
import { jsx } from "@emotion/core";
import { useTransactions } from "../selectors";

// {date} comes as a string {YYYY-M}

function Transactions({ date }) {
  const transactions = useTransactions();

  const tableCss = {
    width: "80%",
    borderCollapse: "collapse",
    margin: "0 auto"
  };

  const thCss = {
    background: "#333",
    color: "white",
    fontWeight: "bolder",
    padding: 6,
    border: "1px solid #ccc",
    textAlign: "left"
  };

  const tdCss = {
    background: "#545454",
    color: "white",
    fontWeight: "bold",
    padding: 6,
    border: "1px solid #ccc",
    textAlign: "left"
  };

  const sectionCss = {
    width: "80%",
    margin: "0 auto"
  };

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
      return accum + transaction.amount + 0.0;
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
      <section
        css={{ ...sectionCss, display: "flex", justifyContent: "right" }}
      >
        <Link
          to={`../../`}
          css={{
            padding: "10px 20px",
            borderRadius: 8,
            color: "#FFFFFF",
            backgroundColor: "green",
            textDecoration: "none",
            "&:hover": { backgroundColor: "#33FF33" }
          }}
        >
          Back
        </Link>
      </section>
      <section css={sectionCss}>
        <h2 css={{ fontSize: 30 }}>Month's Transactions</h2>
        <table css={tableCss}>
          <thead>
            <tr>
              <th css={thCss}>
                <span css={{ fontWeight: "bold" }}>Month:</span>
              </th>
              <td colSpan="2" css={tdCss}>
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
              <th css={thCss}>Date</th>
              <th css={thCss}>Category</th>
              <th css={thCss}>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td css={{ ...tdCss, textAlign: "center" }}>
                {formatTransactionDate(startMonth(date))}
              </td>
              <td css={tdCss}>Initial Balance</td>
              <td css={{ ...tdCss, textAlign: "right" }}>
                {initialBalance(startMonth(date))}
              </td>
            </tr>
            {transactionManager(date).map((day, index) => {
              return (
                <tr key={index}>
                  <td css={{ ...tdCss, textAlign: "center" }}>
                    {formatTransactionDate(day.id)}
                  </td>
                  <td css={tdCss}>{day.category}</td>
                  <td css={{ ...tdCss, textAlign: "right" }}>{day.amount}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2" css={tdCss}>
                <span css={{ fontWeight: "bold" }}>Balance:</span>
              </td>
              <td css={{ ...tdCss, textAlign: "right" }}>
                {initialBalance(startMonth(date)) + balance()}
              </td>
            </tr>
          </tfoot>
        </table>
        <table />
      </section>
      <section css={sectionCss}>
        <h2>Month's Highest Ingresses and Withdraws</h2>
        <table css={tableCss}>
          <thead>
            <tr>
              <th css={thCss}>Category</th>
              <th css={thCss}>Transactions</th>
              <th css={thCss}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {mostsTransactions().map((element, index) => {
              return (
                <tr key={index}>
                  <td css={tdCss}>{element.category}</td>
                  <td css={tdCss}>
                    {element.amount >= 0 ? "Most Ingresses" : "Most Withdraw"}
                  </td>
                  <td css={{ ...tdCss, textAlign: "right" }}>
                    {element.amount}
                  </td>
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
