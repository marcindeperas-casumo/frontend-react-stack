// @flow
// @ts-expect-error ts-migrate(1383) FIXME: Only named exports may use 'export type'.
export type * from "./GameListVerticalContainer";
export {
  GameListVerticalContainer as GameListVertical,
} from "./GameListVerticalContainer";
