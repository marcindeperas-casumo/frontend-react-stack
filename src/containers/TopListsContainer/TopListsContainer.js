import { connect } from "react-redux";
import TopLists from "Components/TopLists";
import { visibleTopListIds } from "Reducers/schema/selector";

export const TopListsContainer = connect(state => ({
  listIds: visibleTopListIds(state),
}))(TopLists);

export default TopListsContainer;
