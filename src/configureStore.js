import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = initialState => {
  const middleware = [thunk];

  const composedEnhancers = composeEnhancers(applyMiddleware(...middleware))(
    createStore
  );

  const store = composedEnhancers(rootReducer, initialState);

  return store;
};

export default configureStore;
