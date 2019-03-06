// @flow
import React from "react";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import GameSearch from "Components/GameSearch/GameSearch";
import {
  cmsPageSlug,
  gameSearchResults,
  initFetchQuerySearch,
  isLoadingSelector,
  hasNoResultsSelector,
  clearSearch,
  gameSearchQuerySelector,
} from "Models/gameSearch";
import { preloadFetchPlayerGames } from "Models/playerGames";
import { getField, fetchPageBySlug } from "Models/cms";

const GameSearchConnected = connect(
  createStructuredSelector({
    searchResults: gameSearchResults,
    loading: isLoadingSelector,
    noResults: hasNoResultsSelector,
    inputPromptPlaceholder: getField({
      slug: cmsPageSlug,
      field: "input_prompt",
    }),
    query: gameSearchQuerySelector,
  }),
  {
    initFetchQuerySearch,
    clearSearch,
    preloadFetchPlayerGames,
    fetchPageBySlug: () => fetchPageBySlug(cmsPageSlug),
  }
)(GameSearch);

type Props = {};

const GameSearchContainer = (props: Props) => (
  <GameSearchConnected {...props} />
);

export default GameSearchContainer;
