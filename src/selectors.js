import React from "react";
import { useSelector, shallowEqual } from "react-redux";

function useResults() {
  return useSelector(state => Object.values(state.results), shallowEqual);
}

export { useResults };
