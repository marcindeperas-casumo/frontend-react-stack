// @flow

export type Competition = FavouriteSportsSelectorContext_groups_favouriteCompetitions;

export type StageFavouritesAPI = {
  sports: Array<FavouriteSportsSelectorContext_groups>,
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
