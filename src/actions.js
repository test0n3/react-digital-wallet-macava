function reset() {
  return { type: "RESET" };
}

function addTransaction(transaction) {
  return {
    type: "ADD_TRANSACTION",
    payload: {
      transaction
    }
  };
}

export { reset, addTransaction };
