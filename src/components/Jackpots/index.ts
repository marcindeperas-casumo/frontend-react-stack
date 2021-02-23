// @flow
// @ts-expect-error ts-migrate(1383) FIXME: Only named exports may use 'export type'.
export type * from "./JackpotsContainer";
export { JackpotsContainer as Jackpots } from "./JackpotsContainer";
