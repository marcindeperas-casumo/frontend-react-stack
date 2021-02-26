// @flow
import React from "react";
import { Router } from "@reach/router";
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
