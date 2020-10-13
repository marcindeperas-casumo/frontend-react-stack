//@flow
import { createReducer } from "Utils";
import { actionTypes } from "./methodConfig.constants";

const DEFAULT_STATE = {
  methods: {},
};

const handlers = {
  [actionTypes.SET_METHOD_CONFIG]: (state, action) => ({
    ...state,
    methods: {
      ...state.methods,
      [action.methodType]: action.config,
    },
  }),
};

export const methodConfigReducer = createReducer<Object>(
  DEFAULT_STATE,
  handlers
);
