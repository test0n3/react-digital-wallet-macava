import { createStore, applyMiddleware, compose } from "redux";
import reducer, { initialState } from "./reducer";
import offlineSync from "./middlewares/offline-sync";
import logger from "redux-logger";

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (localStorage.getItem("version") !== process.env.REACT_APP_VERSION) {
  localStorage.removeItem("state");
}

const preloadedState = JSON.parse(
  localStorage.getItem("state") || JSON.stringify(initialState)
);

const store = createStore(
  reducer,
  preloadedState,
  composer(applyMiddleware(offlineSync, logger))
);

// store.subscribe(() => {
//   console.log(store.getState());
// });

export default store;
