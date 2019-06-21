import React from "react";
import { useResults } from "../selectors";
import { navigate } from "@reach/router";

function Dashboard() {
  const results = useResults();

  function handleClick(event) {
    event.preventDefault();
    navigate("/new-transactions");
  }

  return (
    <>
      <div>
        <div>
          <span>Balance</span>
          <div>{results[results.length - 1].finalBalance}</div>
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
          <tbody>
            {results.map((result, index) => {
              const splittedId = result.id.split("-");
              const month = splittedId[1];
              return (
                <tr>
                  <th key={index}>{new Date(index).getFullYear()}</th>
                  <th key={index}> {month}</th>
                  <th key={index}> {result.initialBalance}</th>
                  <th key={index}> {result.ingresses}</th>
                  <th key={index}> {result.withdraws}</th>
                  <th key={index}> {result.finalBalance}</th>
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
