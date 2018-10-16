import ScrollableList from "Components/ScrollableList";
import { connect } from "react-redux";
import { topListSelectorById } from "Reducers/schema/selector";

const getData = (state, props) => topListSelectorById(props.listId)(state);

const TopListContainer = connect(getData)(ScrollableList);

export default TopListContainer;
