const initialState = {
  categories: [
    "food",
    "entertainment",
    "transportation",
    "services",
    "salary",
    "extraIncome"
  ],
  transactions: {},
  results: {}
};

function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "RESET": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export default reducer;
