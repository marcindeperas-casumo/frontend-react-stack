// @flow
// @ts-expect-error ts-migrate(1383) FIXME: Only named exports may use 'export type'.
export type * from "./ContentSubtitle"; // eslint-disable-line import/export
export { ContentSubtitle } from "./ContentSubtitle"; // eslint-disable-line import/export
