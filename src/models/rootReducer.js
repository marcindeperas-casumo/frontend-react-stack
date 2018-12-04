import { combineReducers } from "redux";
import { reducer as migrationComponents } from "Models/migrationComponents";
import { reducer as fetch } from "Models/fetch";
import { reducer as handshake } from "Models/handshake";
import { reducer as schema } from "Models/schema";

const rootReducer = combineReducers({
  migrationComponents,
  fetch,
  handshake,
  schema,
});

export default rootReducer;
