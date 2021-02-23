// @flow
import * as R from "ramda";
import { createSelector } from "reselect";
import { interpolate } from "Utils";
import { cmsSlugs } from "./tac.constants";

type Acknowledgement = {
  version: number,
  timestamp: number,
};
const getAcknowledgement = (x: any): Acknowledgement => ({
  version: R.prop("version", x),
  timestamp: R.path(["acknowledgement", "timestamp"], x),
});

export const getAcknowledgements: any => {
  // @ts-expect-error ts-migrate(2693) FIXME: 'Acknowledgement' only refers to a type, but is be... Remove this comment to see the full error message
  first: Acknowledgement,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'last'.
  last: Acknowledgement,
} = createSelector(
  R.pathOr({}, ["schema", "acknowledgements"]),
  R.evolve({
    first: getAcknowledgement,
    last: getAcknowledgement,
  })
);

export const getRelevantVersionsSlugs: any => {
  // @ts-expect-error ts-migrate(2693) FIXME: 'number' only refers to a type, but is being used ... Remove this comment to see the full error message
  [number]: string,
} = createSelector(
  getAcknowledgements,
  acks => {
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
  }
);
