import { addTransaction, reset } from "./actions";

test("addTransaction - action", () => {
  var transaction = {
    id: 1556755200000,
    category: "Salary",
    amount: 2200,
    type: "ingresses"
  };
  const newTransaction = addTransaction(transaction);
  expect(newTransaction).toEqual({
    type: "ADD_TRANSACTION",
    payload: {
      transaction
    }
  });
});

test("action - reset", () => {
  expect(reset()).toEqual({ type: "RESET" });
});
