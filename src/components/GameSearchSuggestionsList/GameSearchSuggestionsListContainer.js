// @flow
import { connect } from "react-redux";
import {
  gameSearchSuggestedList,
  isSuggestedLoadingSelector,
} from "Models/gameSearch";
import GameSearchSuggestionsList from "./GameSearchSuggestionsList";

export default connect(state => ({
  gameSearchSuggestedList: gameSearchSuggestedList(state),
  gameSearchSuggestedLoading: isSuggestedLoadingSelector(state),
}))(GameSearchSuggestionsList);
