import React from "react";
import { useDispatch } from "react-redux";

import { reset, addTransaction } from "./actions";

export function useReset() {
  const dispatch = useDispatch();
  return React.useCallback(() => dispatch(reset()), [dispatch]);
}

export function useAddTransaction() {
  const dispatch = useDispatch();
  return React.useCallback(
    transaction => dispatch(addTransaction(transaction)),
    [dispatch]
  );
}
