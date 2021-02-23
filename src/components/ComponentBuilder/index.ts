// @flow
export type * from "./ComponentBuilderContainer";
export {
  ComponentBuilderContainer as ComponentBuilder,
} from "./ComponentBuilderContainer";

// HEADS UP!
// Only needed until we replace all the default exports
// and until we update the Lazy components to cater for
// named exports as well.
export {
  ComponentBuilderContainer as default,
} from "./ComponentBuilderContainer";
