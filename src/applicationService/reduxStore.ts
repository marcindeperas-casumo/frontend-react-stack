import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import rootReducer from "Models/root.reducer";
import rootSaga from "Models/root.saga";
import { mandatoryMessagesApi } from "Models/mandatoryMessages";
import * as storage from "Lib/storage";
import { STORE_REHYDRATE, STORE_PERSISTED_STATE_KEY } from "Src/constants";

export const createReduxStore = (preloadedState: {}) => {
  const composeEnhancers = __DEV__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [thunk, sagaMiddleware, mandatoryMessagesApi.middleware];
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
