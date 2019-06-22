import React from "react";
import { useTotalBalance, useTransactions } from "../selectors";
import { navigate } from "@reach/router";

function Dashboard() {
  const totalBalance = useTotalBalance();
  const transactions = useTransactions();

  console.log(
    transactions.map(transaction => [
      new Date(transaction.id).getMonth() + 1,
      new Date(1556755200000).getFullYear()
    ])
  );

  // React.useEffect(() => {
  //   console.log(transactions.map(transaction => new Date(transaction.id).getMonth()))
  // }, []);

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
              <th> Year</th>
              <th> Month</th>
              <th> Initial Balance</th>
              <th> Ingresses</th>
              <th> Withdraws</th>
              <th> Final Balance</th>
            </tr>
          </thead>
          {/* <tbody>
            {results.map((result, index) => {
              const splittedId = result.id.split("-");
              const month = splittedId[1];
              return (
                <tr key={result.id}>
                  <th>{new Date(index).getFullYear()}</th>
                  <th> {month}</th>
                  <th> {result.initialBalance}</th>
                  <th> {result.ingresses}</th>
                  <th> {result.withdraws}</th>
                  <th> {result.finalBalance}</th>
                </tr>
              );
            })}
          </tbody> */}
        </table>
      </div>
    </>
  );
}

export default Dashboard;
