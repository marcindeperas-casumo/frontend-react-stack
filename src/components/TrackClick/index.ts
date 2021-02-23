// @flow
// @ts-expect-error ts-migrate(1383) FIXME: Only named exports may use 'export type'.
export type * from "./TrackClick"; // eslint-disable-line import/export
export { default } from "./TrackClick";
