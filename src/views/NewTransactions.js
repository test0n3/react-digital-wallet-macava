/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { useCategories } from "../selectors";
import { navigate } from "@reach/router";
import { useAddTransaction } from "../action-hooks";

function NewTransaction() {
  const addTransaction = useAddTransaction();
  const categories = useCategories();

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
      data.amount *= -1;
    } else {
      data.amount *= 1;
    }
    Object.assign(data, { id: Date.now() });
    addTransaction(data);
    const month = new Date(data.id).getMonth() + 1;
    const year = new Date(data.id).getFullYear();
    navigate(`/transactions/${year}-${month}`);
  }

  const submitCss = {
    display: "block",
    marginTop: 10,
    border: 0,
    borderRadius: 8,
    backgroundColor: "#21B396",
    color: "#FFFFFF",
    fontWeight: "bold",
    width: 200,
    height: 40,
    fontSize: 20,
    "&:hover": {
      backgroundColor: "#1E8979"
    }
  };

  const formCss = {
    width: "65%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  };

  return (
    <form onSubmit={handleSubmit} css={formCss}>
      <section>
        <label htmlFor="amount">
          <input type="number" min="0" name="amount" />
        </label>
        <label htmlFor="category">
          <select css={{ fontSize: 16, borderRadius: 120 }} name="category">
            <option hidden>Choose a category</option>
            {categories.map(category => {
              return <option value={category}>{category}</option>;
            })}
          </select>
        </label>
        <fieldset
          css={{
            textAlign: "center",
            padding: 5,
            borderRadius: 50,
            margin: 10
          }}
        >
          <input type="radio" id="ingress" name="type" value="ingresses" />
          <label htmlFor="ingress">Income</label>
          <input type="radio" id="withdraw" name="type" value="withdraws" />
          <label htmlFor="withdraw">Withdraw</label>
        </fieldset>
      </section>
      <section>
        <input type="submit" css={submitCss} />
      </section>
    </form>
  );
}

export default NewTransaction;
