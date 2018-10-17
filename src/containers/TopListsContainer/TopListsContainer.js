import { connect } from "react-redux";
import TopLists from "Components/TopLists";
import { topListIds } from "Reducers/schema/selector";

export const TopListsContainer = connect(topListIds)(TopLists);

export default TopListsContainer;
