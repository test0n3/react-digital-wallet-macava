/** @jsx jsx */

import { jsx } from "@emotion/core";
import { useTransactions } from "../selectors";

// {date} comes as a number

function Transactions({ date }) {
  const transactions = useTransactions();
  console.table("Transaccions:", transactions);
  const monthTransactions = dateManager(date);

  function nextMonth(date) {
    console.log("data nextMonth:", date);
    return new Date(date).setMonth(new Date(date).getMonth() + 1);
  }

  function initialBalance(date) {
    return void 0;
  }

  function dateManager(expectedDate) {
    let monthTransactions = [];
    console.log("Fecha pasada:", expectedDate);
    const newDate = Date.parse(expectedDate);
    console.log("fecha filtro:", newDate);
    for (let key in transactions) {
      if (
        Date.parse(key) > newDate &&
        Date.parse(key) < nextMonth(expectedDate)
      )
        monthTransactions.push(transactions[key]);
    }
    console.log(monthTransactions);
    return monthTransactions;
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
            <td colSpan="2">January 2019</td>
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
            <td>2100</td>
          </tr>
          <tr>
            <td>02/01/2019</td>
            <td>Food</td>
            <td>-500</td>
          </tr>
          <tr>
            <td>03/01/2019</td>
            <td>Food</td>
            <td>-200</td>
          </tr>
          <tr>
            <td>03/01/2019</td>
            <td>Salary</td>
            <td>1200</td>
          </tr>
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
