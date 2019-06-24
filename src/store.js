import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducer";
<<<<<<< HEAD
import offlineSync from "./middlewares/offline-sync";
=======
>>>>>>> f65741f6da484816fb9e18a82c7474e08acbf820
import logger from "redux-logger";

const composer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

if (localStorage.getItem("version") !== process.env.REACT_APP_VERSION) {
  localStorage.removeItem("state");
}

const preloadedState = JSON.parse(localStorage.getItem("state") || "{}");

const store = createStore(
  reducer,
  preloadedState,
  composer(applyMiddleware(offlineSync, logger))
);

// store.subscribe(() => {
//   console.log(store.getState());
// });

export default store;
