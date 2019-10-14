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
  first: Acknowledgement,
  last: Acknowledgement,
} = createSelector(
  R.pathOr({}, ["schema", "acknowledgements"]),
  R.evolve({
    first: getAcknowledgement,
    last: getAcknowledgement,
  })
);

export const getRelevantVersionsSlugs: any => {
  [number]: string,
} = createSelector(
  getAcknowledgements,
  acks => {
    const firstVersion = R.path(["first", "version"], acks);
    const lastVersion = R.path(["last", "version"], acks);

    if (firstVersion && lastVersion) {
      return R.pipe(
        R.times(i => i + firstVersion),
        R.map(version => [version, interpolate(cmsSlugs.version, { version })]),
        R.fromPairs
      )(lastVersion - firstVersion + 1);
    }

    return {};
  }
);
