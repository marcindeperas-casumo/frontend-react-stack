import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rollbarMiddleware from "rollbar-redux-middleware";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import Rollbar from "./lib/rollbar";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = preloadedState => {
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

    module.hot.accept("./sagas", () => {
      store.replaceReducer(require("./sagas").default);
    });
  }

  return store;
};

export default configureStore;
