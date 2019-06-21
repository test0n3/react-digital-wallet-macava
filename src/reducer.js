const initialState = {
  categories: [
    "Food",
    "Entertainment",
    "Transportation",
    "Services",
    "Salary",
    "ExtraIncome"
  ],
  transactions: {
    "2019-05-01": {
      id: "2019-05-01",
      category: "Salary",
      amount: 2200,
      type: "ingresses"
    },
    "2019-05-02": {
      id: "2019-05-02",
      category: "Food",
      amount: -200,
      type: "withdraws"
    },
    "2019-06-01": {
      id: "2019-06-01",
      category: "Food",
      amount: -500,
      type: "withdraws"
    },
    "2019-06-02": {
      id: "2019-06-02",
      category: "Food",
      amount: -200,
      type: "withdraws"
    },
    "2019-06-03": {
      id: "2019-06-03",
      category: "Salary",
      amount: 1200,
      type: "ingresses"
    }
  },
  results: {
    "2019-05": {
      id: "2019-05",
      initialBalance: 100,
      ingresses: 2200,
      withdraws: -200,
      finalBalance: 2100
    },
    "2019-06": {
      id: "2019-06",
      initialBalance: 2100,
      ingresses: 1200,
      withdraws: -700,
      finalBalance: 2600
    }
  }
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "ADD_TRANSACTION": {
      return {
        ...state,
        transactions: {
          ...state.transactions,
          [action.payload.transaction.id]: action.payload.transaction
        }
      };
    }
    case "RESET": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export default reducer;
