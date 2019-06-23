import reducer from "./reducer";

test("reducer - default", () => {
  const finalState = reducer(
    {
      transactions: {
        1556755200000: {
          id: 1556755200000,
          category: "Salary",
          amount: 2200,
          type: "ingresses"
        }
      },
      categories: [
        "Food",
        "Entertainment",
        "Transportation",
        "Services",
        "Salary",
        "ExtraIncome"
      ]
    },
    { type: "random" }
  );

  const expectedState = {
    transactions: {
      1556755200000: {
        id: 1556755200000,
        category: "Salary",
        amount: 2200,
        type: "ingresses"
      }
    },
    categories: [
      "Food",
      "Entertainment",
      "Transportation",
      "Services",
      "Salary",
      "ExtraIncome"
    ]
  };
  expect(finalState).toEqual(expectedState);
});
