// This file contains global module declarations and hacks.
// Add comment explaining "why" every time you edit.

// by default typescript is not allowing importing svg files
declare module "*.svg" {
  const content: any;
  export default content;
}

declare var __DEV__: boolean;

interface Window {
  bridge: any;
}
