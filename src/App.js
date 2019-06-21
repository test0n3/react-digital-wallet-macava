/** @jsx jsx */
import { jsx, Global } from "@emotion/core";
import React from "react";
import { Router } from "@reach/router";
import Dashboard from "./views/Dashboard";
import Transactions from "./views/Transactions";
import NewTransactions from "./views/NewTransactions";
import Navbar from "./components/Navbar";

function App() {
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
          <Transactions path="/transactions" />
          <NewTransactions path="/new-transactions" />
        </Router>
      </main>
    </>
  );
}

export default App;
