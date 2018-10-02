import { connect } from "react-redux";
import TopLists from "Components/TopLists";

const getData = state => ({
  listIds: Object.keys(state.schema.gameList),
});

export const TopListsContainer = connect(getData)(TopLists);

export default TopListsContainer;
