/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import React from "react";
import { Router } from "@reach/router";
import Dashboard from "./views/Dashboard";
import Transactions from "./views/Transactions";
import NewTransactions from "./views/NewTransactions";
import Navbar from "./components/Navbar";

function App() {
  const date = 1559520000000;
  return (
    <>
      <Global
        styles={{
          body: {
            fontFamily: "'Helvetica Neue', sans-serif",
            margin: 0
          }
        }}
      />
      <Navbar />
      <main>
        <Router>
          <Dashboard path="/" />
          {/* <Transactions path="/transactions/:id" /> */}
<<<<<<< HEAD
          <Transactions path="/transactions" date={date} />
=======
          <Transactions path="/transactions" />
>>>>>>> 472f52497556fc46d6b6aa29b5c660b9d1deef64
          <NewTransactions path="/new-transactions" />
        </Router>
      </main>
    </>
  );
}

export default App;
