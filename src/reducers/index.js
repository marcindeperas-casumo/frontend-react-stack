import { combineReducers } from "redux";
import testredux from "./testredux";
import migrationComponents from "Reducers/migrationComponents";
import app from "Reducers/app";
import fetch from "Reducers/fetch";
import { handshake } from "Reducers/handshake";

export default combineReducers({
  testredux,
  migrationComponents,
  app,
  fetch,
  handshake,
});
