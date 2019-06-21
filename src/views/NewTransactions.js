/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";

function NewTransaction(props) {
  function handleAmount(event) {
    // props.setAmount(event.target.value);
  }

  function handleCategories(event) {
    // props.selectCategory(event.target.value);
  }

  function handleTypes(event) {}

  return (
    <form>
      <label htmlFor="amount">
        <input type="number" onChange={handleAmount} />
      </label>
      <label htmlFor="category">
        <select onChange={handleCategories} value={props.category}>
          <option value="NONE">Choose a category</option>
        </select>
      </label>
      <fieldset>
        <input
          type="radio"
          id="income"
          name="trasactionType"
          value="income"
          onChange={handleTypes}
        />
        <label htmlFor="income">Income</label>
        <input
          type="radio"
          id="withdraw"
          name="transactionType"
          value="withdra"
          onChange={handleTypes}
        />
        <label htmlFor="withdraw">Withdraw</label>
      </fieldset>
      <button
        type="submit"
        css={{
          display: "block",
          margin: "0 auto",
          border: 0,
          borderRadius: 8,
          backgroundColor: "green",
          color: "#FFFFFF",
          fontWeight: "bold",
          width: 200,
          height: 40,
          "&:hover": {
            backgroundColor: "#33FF33"
          }
        }}
      >
        Submit
      </button>
    </form>
  );
}

export default NewTransaction;
