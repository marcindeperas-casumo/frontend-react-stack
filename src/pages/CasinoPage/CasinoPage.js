// @flow
import React from "react";
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
        <CasinoListsPage path="lists" />
        <ReelRacesPage path="reel-races" />
      </Router>
    </SubNavLayout>
  );
};
