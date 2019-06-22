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

  return (
    <>
      <div>
        <div>
          <span>Balance</span>
          <div>{totalBalance}</div>
        </div>
        <button onClick={handleClick}>New Transaction</button>
      </div>
      <div> Ingresses and withdraws per month </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Month</th>
              <th>Initial Balance</th>
              <th>Ingresses</th>
              <th>Withdraws</th>
              <th>Final Balance</th>
            </tr>
          </thead>
          <tbody>
            {results.map(result => {
              return (
                <tr key={result.id}>
                  <th>{result.year}</th>
                  <th>
                    <Link to={`/transactions/${result.year}-${result.month}`}>
                      {result.month}
                    </Link>
                  </th>
                  <th>{result.initialBalance}</th>
                  <th>{result.ingresses}</th>
                  <th>{result.withdraws}</th>
                  <th>{result.balance}</th>
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
