import * as React from "react";
import { Router, Redirect } from "@reach/router";
import { SubNavLayout } from "Layouts/SubNavLayout/index";
import { CasinoListsPage, ReelRacesPage } from "./subPages";

export const CasinoPage = () => {
  const subNavLinks = [
    {
      to: "/casino/lists",
      text: "Games",
    },
    {
      to: "/casino/reel-races",
      text: "Races",
    },
  ];

  return (
    <SubNavLayout links={subNavLinks}>
      <Router>
        <Redirect from="/" to="lists" />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <CasinoListsPage path="lists" />
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ path: string; }' is not assignable to type... Remove this comment to see the full error message */}
        <ReelRacesPage path="reel-races" />
      </Router>
    </SubNavLayout>
  );
};
