// @flow
// @ts-expect-error ts-migrate(1383) FIXME: Only named exports may use 'export type'.
export type * from "./EitherOr"; // eslint-disable-line import/export
export { EitherOr } from "./EitherOr"; // eslint-disable-line import/export
