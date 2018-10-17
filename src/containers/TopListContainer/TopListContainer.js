import ScrollableList from "Components/ScrollableList";
import { connect } from "react-redux";
import { topListSelectorByQuery } from "Reducers/schema/selector";

// TODO: @leventebalogh get the list-ids from the constants (coming in a new PR)
// TODO: @leventebalogh move this logic to somewhere where it is tested.
// We would only like to show the maintenance mode games for the latest played games.
const LISTS_SHOWING_MAINTENANCE = ["latestPlayedGames"];
const showMaintenance = listId => LISTS_SHOWING_MAINTENANCE.includes(listId);
const getQuery = listId =>
  showMaintenance(listId) ? {} : { maintenance: false };
const getData = (state, { listId }) =>
  topListSelectorByQuery(listId, getQuery(listId))(state);

const TopListContainer = connect(getData)(ScrollableList);

export default TopListContainer;
