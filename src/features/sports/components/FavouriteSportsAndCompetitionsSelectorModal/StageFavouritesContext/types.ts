// @flow
import * as A from "Types/apollo";

export type Competition = A.FavouriteSportsSelectorContext_groups_favouriteCompetitions;

export type StageFavouritesAPI = {
  sports: Array<A.FavouriteSportsSelectorContext_groups>,
  isFirstTimeSelectingFavourites: boolean,
  isFirstTimeSelectingFavouriteCompetitions: boolean,
  isSportsPlayer: boolean,
  toggleFavouriteSport: (id: number) => void,
  toggleAllSports: () => void,
  getSelectedSportsCount: () => number,
  setFavouriteCompetitions: (
    sportId: number,
    competitions: Array<Competition>
  ) => void,
  toggleFavouriteCompetition: (
    sportId: number,
    competition: Competition
  ) => void,
  getSelectedIds: () => Array<number>,
  trackOnbordingSports: () => void,
  getSportNameById: (sportId: number) => string,
  isSelected: (id: number) => boolean,
};
