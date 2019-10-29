// @flow

export type Competition = gFavouriteSportsSelectorContext_groups_favouriteCompetitions;

export type StageFavouritesAPI = {
  sports: Array<gFavouriteSportsSelectorContext_groups>,
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
  isSelected: (id: number) => boolean,
};
