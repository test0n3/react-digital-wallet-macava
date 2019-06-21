import React from "react";
import { Router } from "@reach/router";
import Dashboard from "./views/Dashboard";
import Transactions from "./views/Transactions";
import NewTransactions from "./views/NewTransactions";

function App() {
  return (
    <>
      <main>
        <Router>
          <Dashboard path="/" />
          {/* <Transactions path="/transactions/:id" />
          <NewTransactions path="/new-transactions" /> */}
        </Router>
      </main>
    </>
  );
}

export default App;
