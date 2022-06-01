import { createSelector } from "reselect";
import * as R from "ramda";
import { interpolate } from "Utils";
import { cmsSlugs } from "./tac.constants";

type Acknowledgement = {
  version: number;
  timestamp: number;
};
const getAcknowledgement = (x: any): Acknowledgement => ({
  version: R.prop("version", x),
  timestamp: R.path(["acknowledgement", "timestamp"], x),
});

// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, Evolve<{}, { first: (x: ... Remove this comment to see the full error message
export const getAcknowledgements: (state: any) => {
  first: Acknowledgement;
  last: Acknowledgement;
} = createSelector(
  R.pathOr({}, ["schema", "acknowledgements"]),
  R.evolve({
    first: getAcknowledgement,
    last: getAcknowledgement,
  })
);

export const getRelevantVersionsSlugs: (state: any) => {
  [n: number]: string;
} = createSelector(getAcknowledgements, acks => {
  const firstVersion = R.path(["first", "version"], acks);
  const lastVersion = R.path(["last", "version"], acks);

  if (firstVersion && lastVersion) {
    return R.pipe(
      // @ts-expect-error ts-migrate(2365) FIXME: Operator '+' cannot be applied to types 'number' a... Remove this comment to see the full error message
      R.times(i => i + firstVersion),
      R.map(version => [version, interpolate(cmsSlugs.version, { version })]),
      R.fromPairs
      // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
    )(lastVersion - firstVersion + 1);
  }

  return {};
});
