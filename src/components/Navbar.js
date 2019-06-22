/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { Link } from "@reach/router";

function Nabvar() {
  const navbarCss = {
    display: "flex",
    margin: "0",
    padding: "1.5em",
    background: "#21B396",
    color: "#fff",
    marginBottom: "2em"
  };

  const logoCss = {
    height: "40px",
    width: "160px",
    border: "2px hidden",
    backgroundColor: "#A2EFE0",
    borderRadius: "1em",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "inset 0 0 10px #16443B"
  };

  return (
    <nav css={navbarCss}>
      <div css={logoCss}>
        <Link css={{ textDecoration: "none", color: "black" }} to="/">
          E-Wallet-MACAVA
        </Link>
      </div>
    </nav>
  );
}

export default Nabvar;
