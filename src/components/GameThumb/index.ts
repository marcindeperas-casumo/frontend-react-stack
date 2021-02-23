// @flow
// @ts-expect-error ts-migrate(1383) FIXME: Only named exports may use 'export type'.
export type * from "./GameThumb"; // eslint-disable-line import/export
export { GameThumb } from "./GameThumb"; // eslint-disable-line import/export
