// @flow
// @ts-expect-error ts-migrate(1383) FIXME: Only named exports may use 'export type'.
export type * from "./CuratedCardContainer";
export { CuratedCardContainer as CuratedCard } from "./CuratedCardContainer";
