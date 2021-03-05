/* eslint-disable no-unused-vars */
// This file contains global module declarations and hacks.
// Add comment explaining "why" every time you edit.

// by default typescript is not allowing importing svg files
declare module "*.svg" {
  const content: any;
  export default content;
}
declare module "*.scss" {
  const content: any;
  export default content;
}

type ValueOf<T> = T[keyof T];

type A_BigInt = number;
type Long = number;

declare const __DEV__: boolean;

interface Window {
  bridge: any;
  native: any;
  Intercom: any;
  __REACT_DEVTOOLS_GLOBAL_HOOK__: any;
}
/* eslint-enable no-unused-vars */
