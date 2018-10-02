import { connect } from "react-redux";
import { ListOfGamesLists } from "Components/GamesLists/GamesLists";

export default connect(state => ({
  listIds: Object.keys(state.schema.gameList),
}))(ListOfGamesLists);
