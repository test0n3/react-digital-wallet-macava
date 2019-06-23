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
test("reducer - RESET", () => {
  const initialState = {
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
  const action = { type: "RESET" };
  const finalState = reducer(initialState, action);
  const expectedState = {
    transactions: {
      1556755200000: {
        id: 1556755200000,
        category: "Salary",
        amount: 2200,
        type: "ingresses"
        // '5/1/2019'
      },
      1556841600000: {
        id: 1556841600000,
        category: "Food",
        amount: -200,
        type: "withdraws"
        // 5/2/2019
      },
      1559433600000: {
        id: 1559433600000,
        category: "Food",
        amount: -500,
        type: "withdraws"
        // 6/1/2019
      },
      1559520000000: {
        id: 1559520000000,
        category: "Food",
        amount: -200,
        type: "withdraws"
        // 6/2/2019
      },
      1559606400000: {
        id: 1559606400000,
        category: "Salary",
        amount: 1200,
        type: "ingresses"
        // 6/3/2019
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
