/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

function Transactions() {
  return (
    <div>
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
            <td>01/01/2019</td>
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
    </div>
  );
}

export default Transactions;
