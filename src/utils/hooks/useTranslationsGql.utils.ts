import * as R from "ramda";

export const generateQueries = R.pipe(
  R.mapObjIndexed(
    (value, key) => `${key}: getCMSField(id: "${value}") { id, text }`
  ),
  R.values
);
