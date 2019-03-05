import { combineReducers } from "redux";
import { reducer as migrationComponents } from "Models/migrationComponents";
import { reducer as fetch } from "Models/fetch";
import { reducer as handshake } from "Models/handshake";
import { reducer as playerGames } from "Models/playerGames";
import { reducer as schema } from "Models/schema";

const rootReducer = combineReducers({
  migrationComponents,
  fetch,
  handshake,
  playerGames,
  schema,
});

export default rootReducer;
