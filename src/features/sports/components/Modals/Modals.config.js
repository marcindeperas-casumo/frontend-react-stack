import FavouriteSportsAndCompetitionsSelectorModal from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal";
import EditFavouriteCompetitionsModal from "Features/sports/components/EditFavouriteCompetitionsModal";
import { BettingGlossary } from "Features/sports/components/BettingGlossary";

export const MODAL = {
  BETTING_GLOSSARY: "BETTING_GLOSSARY",
  CHOOSE_FAVOURITES: "CHOOSE_FAVOURITES",
  CHOOSE_FAVOURITE_COMPETITIONS: "CHOOSE_FAVOURITE_COMPETITIONS",
};

export const MODAL_MAPPING = {
  [MODAL.BETTING_GLOSSARY]: BettingGlossary,
  [MODAL.CHOOSE_FAVOURITES]: FavouriteSportsAndCompetitionsSelectorModal,
  [MODAL.CHOOSE_FAVOURITE_COMPETITIONS]: EditFavouriteCompetitionsModal,
};
