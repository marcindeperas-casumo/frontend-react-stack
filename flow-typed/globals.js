// @flow
declare var __DEV__: boolean;

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void,
  },
};

declare type ThunkDispatch = (action: { type: string }) => any;
