/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { useCategories } from "../selectors";
import { navigate } from "@reach/router";
import { useAddTransaction } from "../action-hooks";

function NewTransaction() {
  const addTransaction = useAddTransaction();
  const categories = useCategories();
  // function handleAmount(event) {
  //   // props.setAmount(event.target.value);
  // }

  function toJSON(elements) {
    var obj = {};
    for (var i = 0; i < elements.length; ++i) {
      var element = elements[i];
      var name = element.name;
      var value = element.value;

      if (element.type === "radio") {
        if (element.checked) {
          obj[name] = value;
        }
      } else {
        if (name) {
          obj[name] = value;
        }
      }
    }

    return obj;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = toJSON(event.target.elements);
    if (data.type === "withdraws") {
      data.amount = data.amount * -1;
    } else {
      data.amount = data.amount * 1;
    }
    Object.assign(data, { id: Date.now() });
    addTransaction(data);
    navigate(`/transactions/1`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">
        <input type="number" min="0" name="amount" />
      </label>
      <label htmlFor="category">
        <select name="category">
          <option disabled>Choose a category</option>
          {categories.map(category => {
            return <option value={category}>{category}</option>;
          })}
        </select>
      </label>
      <fieldset>
        <input type="radio" id="ingress" name="type" value="ingresses" />
        <label htmlFor="ingress">Income</label>
        <input type="radio" id="withdraw" name="type" value="withdraws" />
        <label htmlFor="withdraw">Withdraw</label>
      </fieldset>
      <input
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
      />
    </form>
  );
}

export default NewTransaction;
