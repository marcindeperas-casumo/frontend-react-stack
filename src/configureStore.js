import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "Models/rootReducer";
import rootSaga from "Models/rootSaga";
import logger from "Services/logger";
import createErrorLoggerMiddleware from "Lib/logger.middleware";
import config from "./config";
import { isEnvProduction } from "Utils";

const { sanitizedStateKeys } = config;

const configureStore = preloadedState => {
  const composeEnhancers = isEnvProduction()
    ? compose
    : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const sagaMiddleware = createSagaMiddleware();
  const errorLoggerMiddleware = createErrorLoggerMiddleware(
    logger.error,
    sanitizedStateKeys
  );

  const middlewares = [thunk, sagaMiddleware, errorLoggerMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeEnhancers(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // You cannot use alias here! https://github.com/gaearon/react-hot-loader/issues/560
    module.hot.accept("./models/rootReducer", () => {
      const nextRootReducer = require("./models/rootReducer").default;
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
