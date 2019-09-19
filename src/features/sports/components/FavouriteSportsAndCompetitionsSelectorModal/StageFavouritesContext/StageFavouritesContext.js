// @flow

import React from "react";
import { F } from "ramda";
import type { StageFavouritesAPI } from "./types";

const StageFavouritesContext = React.createContext<StageFavouritesAPI>({
  sports: [],
  isFirstTimeSelectingFavourites: false,
  isFirstTimeSelectingFavouriteCompetitions: false,
  toggleFavouriteSport: () => {},
  toggleAllSports: () => {},
  getSelectedSportsCount: () => 0,
  setFavouriteCompetitions: () => {},
  toggleFavouriteCompetition: () => {},
  getSelectedIds: () => [],
  isSelected: F,
  isSportsPlayer: false,
});

export default StageFavouritesContext;
