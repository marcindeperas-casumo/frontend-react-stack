import ScrollableList from "Components/ScrollableList";
import { connect } from "react-redux";

const getData = (state, props) => {
  return {
    ...state.schema.gameList[props.listId],
  };
};

const TopListContainer = connect(getData)(ScrollableList);

export default TopListContainer;
