import { combineReducers } from "redux";
import migrationComponents from "Reducers/migrationComponents";
import fetch from "Reducers/fetch";
import handshake from "Reducers/handshake";
import schema from "Reducers/schema";

export default combineReducers({
  migrationComponents,
  fetch,
  handshake,
  schema,
});
