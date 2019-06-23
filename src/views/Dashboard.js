/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import { useTotalBalance, useTransactions } from "../selectors";
import { navigate, Link } from "@reach/router";
import Transactions from "./Transactions";

function Dashboard() {
  const totalBalance = useTotalBalance();
  const transactions = useTransactions();

  function minDate(transactions) {
    const dates = transactions.map(transaction => new Date(transaction.id));
    var min = dates.reduce(function(a, b) {
      return a < b ? a : b;
    });

    return min;
  }

  const min = minDate(transactions);
  var compareMonth = min.getMonth() + 1;
  var compareYear = min.getFullYear();
  var results = [];
  let result = {
    month: "",
    year: "",
    ingresses: 0,
    withdraws: 0,
    balance: 0,
    initialBalance: 0
  };

  let ingresses = 0;
  let withdraws = 0;
  for (var i = 0; i < transactions.length; i++) {
    if (
      compareMonth === new Date(transactions[i].id).getMonth() + 1 &&
      compareYear === new Date(transactions[i].id).getFullYear()
    ) {
      if (transactions[i].type === "ingresses") {
        ingresses += transactions[i].amount;
      } else {
        withdraws += transactions[i].amount;
      }
      Object.assign(result, {
        month: compareMonth,
        year: compareYear,
        ingresses: ingresses,
        withdraws: withdraws,
        balance: ingresses + withdraws
      });
    } else {
      results.push(result);
      result = {};
      compareMonth = new Date(transactions[i].id).getMonth() + 1;
      compareYear = new Date(transactions[i].id).getFullYear();
      ingresses = 0;
      withdraws = 0;
      if (transactions[i].type === "ingresses") {
        ingresses += transactions[i].amount;
      } else {
        withdraws += transactions[i].amount;
      }
    }
  }
  if (result.hasOwnProperty("month")) {
    results.push(result);
  } else {
    Object.assign(result, {
      month: compareMonth,
      year: compareYear,
      ingresses: ingresses,
      withdraws: withdraws,
      balance: ingresses + withdraws
    });

    results = results.concat(result);
  }

  for (var i = 0; i < results.length; i++) {
    if (i !== 0) {
      var previous = results[i === 0 ? results.length - 1 : i - 1];
      Object.assign(results[i], {
        initialBalance: previous.balance,
        balance: ingresses + withdraws + previous.balance
      });
    }
  }

  function handleClick(event) {
    event.preventDefault();
    navigate("/new-transactions");
  }

  const upperContainer = {
    display: "flex",
    justifyContent: "space-between",
    width: "96%",
    padding: "0px 20px",
    marginBottom: 15
  };

  const balanceContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "16%"
  };

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

  return (
    <>
      <div css={upperContainer}>
        <div css={balanceContainer}>
          <span css={{ fontWeight: "bolder", fontSize: 30 }}>Balance</span>
          <div css={{ fontSize: 30, paddingLeft: 6 }}>${totalBalance}</div>
        </div>
        <button onClick={handleClick}>New Transaction</button>
      </div>
      <h1 css={{ marginLeft: "2%", fontSize: 40 }}>
        Ingresses and withdraws per month
      </h1>
      <div>
        <table css={tableCss}>
          <thead>
            <tr>
              <th css={thCss}>Year</th>
              <th css={thCss}>Month</th>
              <th css={thCss}>Initial Balance</th>
              <th css={thCss}>Ingresses</th>
              <th css={thCss}>Withdraws</th>
              <th css={thCss}>Final Balance</th>
            </tr>
          </thead>
          <tbody>
            {results.map(result => {
              return (
                <tr key={result.id}>
                  <td css={tdCss}>{result.year}</td>
                  <td css={tdCss}>
                    <Link
                      css={{ color: "white" }}
                      to={`/transactions/${result.year}-${result.month}`}
                    >
                      {result.month}
                    </Link>
                  </td>
                  <td css={tdCss}>{result.initialBalance}</td>
                  <td css={tdCss}>{result.ingresses}</td>
                  <td css={tdCss}>{result.withdraws}</td>
                  <td css={tdCss}>{result.balance}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Dashboard;
