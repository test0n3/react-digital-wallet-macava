import React from "react";
import { Router } from "@reach/router";
import Dashboard from "./views/Dashboard";
import Transactions from "./views/Transactions";
import NewTransactions from "./views/NewTransactions";

function App() {
  const date = 1559520000000;
  return (
    <>
      <main>
        <Router>
          <Dashboard path="/" />
          {/* <Transactions path="/transactions/:id" /> */}
          <Transactions path="/transactions" date={date} />
          <NewTransactions path="/new-transactions" />
        </Router>
      </main>
    </>
  );
}

export default App;
