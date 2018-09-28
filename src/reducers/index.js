import { combineReducers } from "redux";
import testredux from "./testredux";
import migrationComponents from "Reducers/migrationComponents";
import app from "Reducers/app";
import fetch from "Reducers/fetch";
import { handshake } from "Reducers/handshake";
import entities from "Reducers/entities";

export default combineReducers({
  testredux,
  migrationComponents,
  app,
  fetch,
  handshake,
  entities,
});
