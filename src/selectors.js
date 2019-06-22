import React from "react";
import { useSelector, shallowEqual } from "react-redux";

function useResults() {
  return useSelector(state => Object.values(state.results), shallowEqual);
}

function useCategories() {
  return useSelector(state => state.categories, shallowEqual);
}

function useTransactions() {
  return useSelector(state => Object.values(state.transactions), shallowEqual);
}
function useTotalBalance() {
  return useSelector(
    state =>
      Object.values(state.transactions).reduce((acc, item) => {
        return acc + item.amount;
      }, 0),
    shallowEqual
  );
}

export { useResults, useCategories, useTransactions, useTotalBalance };
