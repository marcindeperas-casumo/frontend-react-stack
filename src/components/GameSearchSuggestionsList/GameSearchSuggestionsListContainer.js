// @flow
import { connect } from "react-redux";
import {
  gameSearchSuggestedList,
  isSuggestedLoadingSelector,
} from "Models/gameSearch";
import { GameSearchSuggestionsList } from "./GameSearchSuggestionsList";

export const GameSearchSuggestionsListContainer = connect(state => ({
  list: gameSearchSuggestedList(state),
  loading: isSuggestedLoadingSelector(state),
}))(GameSearchSuggestionsList);
