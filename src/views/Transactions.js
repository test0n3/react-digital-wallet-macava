/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { useTransactions } from "../selectors";

// {date} comes as a number

function Transactions({ date }) {
  const transactions = useTransactions();
  console.log(transactions);
  // const monthTransactions = dateManager(date);
  // console.log(monthTransactions);

  function nextMonth(currentDate) {
    return new Date(currentDate).setMonth(new Date(currentDate).getMonth() + 1);
  }

  function initialBalance(month) {
    transactions.reduce((accum, oper) => {
      if (oper.id <= month) accum = +oper.amount;
      return accum;
    });
  }

  function startMonth(currentDate) {
    return new Date(currentDate).setDate(1);
  }

  function dateManager(expectedDate) {
    console.log(
      `Fecha pasada: ${expectedDate} - Next month number: ${nextMonth(
        expectedDate
      )}`
    );
    return transactions.map(transaction => {
      console.log(
        `transaction Id: ${transaction.id}\n transaction amount: ${
          transaction.amount
        }`
      );
      return (
        transaction.id >= expectedDate &&
        transaction.id <= nextMonth(expectedDate)
      );
    });
  }
  // function onButtonReturn() {}
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>
              <span css={{ fontWeight: "bold" }}>Month:</span>
            </th>
            <td colSpan="2">
              {new Date(date).toLocaleDateString("default", { month: "long" }) +
                " " +
                new Date(date).getFullYear()}
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
            <td>{new Date(date)}</td>
            <td>Initial Balance</td>
            <td>{initialBalance(date)}</td>
          </tr>
          {transactions.map(day => {
            console.log(
              `Day: ${day.id}, Category: ${day.category}, Type: ${
                day.type
              }, Amount: ${day.amount}`
            );
            // return (
            //   <tr key={index}>
            //     <td>{new Date(day.id)}</td>
            //     <td>{day.category}</td>
            //     <td>
            //       {day.type === "withdraws"
            //         ? `- ${day.amount}`
            //         : `${day.amount}`}
            //     </td>
            //   </tr>
            // );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <span css={{ fontWeight: "bold" }}>Balance:</span>
            </td>
            <td>2600</td>
          </tr>
        </tfoot>
      </table>
      {/* <button type="button" onChange={onButtonReturn}>
        Return
      </button>*/}
    </>
  );
}

export default Transactions;
