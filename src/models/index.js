import { combineReducers } from "redux";
import migrationComponents from "Models/migrationComponents";
import fetch from "Models/fetch";
import handshake from "Models/handshake";
import schema from "Models/schema";

export default combineReducers({
  migrationComponents,
  fetch,
  handshake,
  schema,
});
