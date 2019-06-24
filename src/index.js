import React from "react";
import App from "./App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import { register } from "./serviceWorker";

const $root = document.getElementById("root");
render(
  <Provider store={store}>
    <App />
  </Provider>,
  $root
);
register();
