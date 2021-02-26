// @flow
import React from "react";
import { Router, Link } from "@reach/router";
import { SubNavLayout } from "Layouts/SubNavLayout/index";
import {
  CasinoSearchPage,
  CasinoListsPage,
  MustDropJackpotsPage,
  GameProviderGamesPage,
  LiveCasinoPage,
} from "./subPages";

export const CasinoPage = () => {
  const subNavLinks = [
    {
      to: "/casino/games",
      text: "Games",
    },
    {
      to: "/casino/races",
      text: "Races",
    },
  ];

  return (
    <div>
      <SubNavLayout links={subNavLinks} />
      <Link to="search">Search</Link>
      <Link to="lists">Lists</Link>
      <Link to="must-drop-jackpots">Must drop jackpots</Link>
      <Link to="live-casino">Live Casino</Link>
      <Router>
        <CasinoSearchPage path="/search" />
        <CasinoListsPage path="/lists" />
        <MustDropJackpotsPage path="/must-drop-jackpots" />
        <LiveCasinoPage path="/live-casino" />
        <GameProviderGamesPage path="/provider/:provider" />
      </Router>
    </div>
  );
};
