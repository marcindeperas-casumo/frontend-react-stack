import ScrollableList from "Components/ScrollableList";
import { connect } from "react-redux";
import { gameListEntitiesSelector } from "Reducers/schema/selector";

const getData = (state, props) => gameListEntitiesSelector(state)[props.listId];

const TopListContainer = connect(getData)(ScrollableList);

export default TopListContainer;
