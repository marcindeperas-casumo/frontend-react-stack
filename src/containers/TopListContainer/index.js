import GameTileContainer from "Containers/GameTileContainer";
import ExclusiveGameTileContainer from "Containers/ExclusiveGameTileContainer";
import ScrollableList from "Components/ScrollableList";
import { connect } from "react-redux";

const componentMap = {
  exclusiveGames: ExclusiveGameTileContainer,
  default: GameTileContainer,
};

const getData = (state, props) => {
  return {
    ...state.schema.gameList[props.listId],
    gameComponent: componentMap[props.listId] || componentMap.default,
  };
};

const ListOfGamesContainer = connect(getData)(ScrollableList);

export default ListOfGamesContainer;
