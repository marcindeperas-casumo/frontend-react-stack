//@flow
import { combineReducers } from "redux";
import { reducer as router } from "Models/router";
import { reducer as fetch } from "Models/fetch";
import { reducer as handshake } from "Models/handshake";
import { reducer as gameSearch } from "Models/gameSearch";
import { reducer as playerGames } from "Models/playerGames";
import { reducer as promotions } from "Models/promotions";
import { reducer as schema } from "Models/schema";

const rootReducer = combineReducers({
  router,
  fetch,
  handshake,
  gameSearch,
  playerGames,
  promotions,
  schema,
});

export default rootReducer;
