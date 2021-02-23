// @flow
import React from "react";
import { Router, Redirect } from "@reach/router";
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
        <Redirect from="/" to="/casino" />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <LazyCasinoPage path="/casino/*" />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <LazySportsPage path="/sports/*" />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <LazyPlayPage path="/play/*" />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <LazyPlayerPage path="/player/*" />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <LazyWalletPage path="/wallet/*" />
      </Router>
    </MainNavLayout>
  );
};
