// @flow
import React from "react";
import { Router, Link } from "@reach/router";
import {
  LazyCasinoPage,
  LazySportsPage,
  LazyPlayPage,
  LazyPlayerPage,
  LazyWalletPage,
} from "Pages";
import { MainNavLayout } from "Layouts";

export default () => {
  return (
    <MainNavLayout>
      <div>This is the root</div>
      <Link to="/casino">Casino</Link>
      <Link to="/sports">Sports</Link>
      <Link to="/player">Player</Link>
      <Link to="/play">Play</Link>
      <Link to="/wallet">Wallet</Link>
      <Router>
        <LazyCasinoPage path="/casino/*" />
        <LazySportsPage path="/sports/*" />
        <LazyPlayPage path="/play/*" />
        <LazyPlayerPage path="/player/*" />
        <LazyWalletPage path="/wallet/*" />
      </Router>
    </MainNavLayout>
  );
};
