import * as R from "ramda";

export const generateQueries = R.pipe(
  R.mapObjIndexed(
    (value, key) => `${key}: getCMSField(id: "${value}") { 
      ... on CmsText {
        id
        text
      }
    	... on CmsFieldList {
        id
        fields {
          id
          text
        }
    	}
    }`
  ),
  R.values
);
