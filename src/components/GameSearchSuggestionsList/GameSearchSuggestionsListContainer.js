// @flow
import { connect } from "react-redux";
import { gameSearchSuggestedList } from "Models/gameSearch";
import GameSearchSuggestionsList from "./GameSearchSuggestionsList";

export default connect(state => ({
  gameSearchSuggestedList: gameSearchSuggestedList(state),
}))(GameSearchSuggestionsList);
