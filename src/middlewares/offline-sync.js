// src/middlewares/offline-sync.js
export default store => next => action => {
  try {
    return next(action);
  } finally {
    localStorage.setItem("state", JSON.stringify(store.getState()));
    localStorage.setItem("version", process.env.REACT_APP_VERSION);
  }
};
