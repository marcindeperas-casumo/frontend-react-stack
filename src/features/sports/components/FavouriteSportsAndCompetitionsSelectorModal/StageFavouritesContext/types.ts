import * as A from "Types/apollo";

export type Competition =
  A.FavouriteSportsSelectorContextQuery["groups"][number]["favouriteCompetitions"][number];

export type StageFavouritesAPI = {
  sports: A.FavouriteSportsSelectorContextQuery["groups"];
  isFirstTimeSelectingFavourites: boolean;
  isFirstTimeSelectingFavouriteCompetitions: boolean;
  isSportsPlayer: boolean;
  toggleFavouriteSport: (id: number) => void;
  toggleAllSports: () => void;
  getSelectedSportsCount: () => number;
  setFavouriteCompetitions: (
    sportId: number,
    competitions: Array<Competition>
  ) => void;
  toggleFavouriteCompetition: (
    sportId: number,
    competition: Competition
  ) => void;
  getSelectedIds: () => Array<number>;
  trackOnbordingSports: () => void;
  getSportNameById: (sportId: number) => string;
  isSelected: (id: number) => boolean;
};
