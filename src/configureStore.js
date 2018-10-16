import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rollbarMiddleware from "rollbar-redux-middleware";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import Rollbar from "./lib/rollbar";
import { isProduction } from "./utils";

const configureStore = preloadedState => {
  const composeEnhancers = isProduction()
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();
  const rollbarRedux = rollbarMiddleware(Rollbar, null, true);

  const middlewares = [thunk, rollbarRedux, sagaMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeEnhancers(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers").default;
      store.replaceReducer(nextRootReducer);
    });

    // Why there isn't there any saga HMR?
    //
    // When this was implemented, every time a saga changed we where calling
    // `store.replaceReducer(nextSaga);` which was causing the state
    // (`store.getState()`) to become a generator function, something that is
    // not right.
    //
    // Now if you are reading this and you have an idea how to improve it please
    // go ahead and have a go.
  }

  return store;
};

export default configureStore;
