// @flow
import React from "react";
import { Router, Link } from "@reach/router";
import {
  CasinoSearchPage,
  CasinoListsPage,
  MustDropJackpotsPage,
  GameProviderGamesPage,
  LiveCasinoPage,
} from "./subPages";

export const CasinoPage = () => {
  return (
    <div>
      <div> This is the casino root</div>
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
