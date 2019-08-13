// @flow
import * as R from "ramda";
import { createSelector } from "reselect";
import { getPage, getCms } from "Models/cms";
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

export const getVersionContent = (version: string) =>
  getPage(cmsSlugs.content.replace("{v}", version));

export const getTACtext = createSelector(
  [getPage(cmsSlugs.main), getAcknowledgements, getCms],
  (page, acks, cms) => {
    const firstVersion = R.path(["first", "version"], acks);
    const lastVersion = R.path(["last", "version"], acks);

    if (firstVersion && lastVersion) {
      const versions = R.pipe(
        R.times(i => i + firstVersion),
        R.map(x => [x, cms[cmsSlugs.version.replace("{v}", x)]]),
        R.fromPairs,
        R.pluck("fields")
      )(lastVersion - firstVersion + 1);

      return {
        ...page.fields,
        versions,
      };
    }

    return page.fields;
  }
);
