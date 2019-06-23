import { addTransaction } from "./actions";
import { string } from "postcss-selector-parser";

test("action - addTransaction", () => {
  const todo = addTransaction({
    amount: 10.0,
    categoryId: 1,
    type: "ingresse"
  });
  expect(todo).toEqual({
    type: "ADD_TRANSACTION",
    payload: {
      id: expect.any(Number),
      amount: 10.0,
      categoryId: 1,
      date: expect.any(String),
      type: "ingresse"
    }
  });
});
