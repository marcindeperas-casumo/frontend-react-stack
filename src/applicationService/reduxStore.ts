import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { MiddlewareAPI, isRejected, Middleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import logger from "Services/logger";
import rootReducer from "Models/root.reducer";
import rootSaga from "Models/root.saga";
import { mandatoryMessagesApi } from "Models/mandatoryMessages";
import { playOkayApi, gameTypeExclusionsApi } from "Models/playOkay";
import { loginSessionApi } from "Models/loginSession";
import * as storage from "Lib/storage";
import { STORE_REHYDRATE, STORE_PERSISTED_STATE_KEY } from "Src/constants";

const rtkQueryErrorLoggerMiddleware: Middleware = (
  api: MiddlewareAPI
) => next => action => {
  // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
  if (isRejected(action)) {
    logger.error(action.error);
  }

  return next(action);
};

export const createReduxStore = (preloadedState: {}) => {
  const composeEnhancers = __DEV__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    thunk,
    sagaMiddleware,
    rtkQueryErrorLoggerMiddleware,
    mandatoryMessagesApi.middleware,
    playOkayApi.middleware,
    gameTypeExclusionsApi.middleware,
    loginSessionApi.middleware,
  ];
  // @ts-ignore
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enhancers = [middlewareEnhancer];
  const composedEnhancers = composeEnhancers(...enhancers);
  const store = createStore(rootReducer, preloadedState, composedEnhancers);
  // Rehydrate store from the persisting storage
  store.dispatch({
    type: STORE_REHYDRATE,
    state: storage.get(STORE_PERSISTED_STATE_KEY, {}),
  });
  // for HMR
  let currentSaga = sagaMiddleware.run(rootSaga); // eslint-disable-line fp/no-let
  if (module.hot) {
    // You cannot use alias here! https://github.com/gaearon/react-hot-loader/issues/560
    module.hot.accept("../models/root.reducer", () => {
      store.replaceReducer(rootReducer);
    });
    module.hot.accept("../models/root.saga", () => {
      currentSaga.cancel();
      currentSaga = sagaMiddleware.run(rootSaga); // eslint-disable-line fp/no-mutation
    });
  }
  return store;
};
export default createReduxStore({});
