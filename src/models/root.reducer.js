//@flow
import { combineReducers } from "redux";
import { reducer as router } from "Models/router";
import { reducer as fetch } from "Models/fetch";
import { reducer as handshake } from "Models/handshake";
import { reducer as gameSearch } from "Models/gameSearch";
import { reducer as playerGames } from "Models/playerGames";
import { reducer as promotions } from "Models/promotions";
import { reducer as schema } from "Models/schema";
import { modalReducer as modal } from "Models/modal";
import { playOkayReducer } from "./playOkay/playOkay.reducer";

const rootReducer = combineReducers({
  router,
  fetch,
  handshake,
  gameSearch,
  playerGames,
  promotions,
  schema,
  modal,
  playOkay: playOkayReducer,
});

export default rootReducer;
