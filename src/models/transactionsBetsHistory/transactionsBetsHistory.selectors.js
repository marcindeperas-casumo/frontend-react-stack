// @flow
import { pathOr, reduce, pipe } from "ramda";
import { createSelector } from "reselect";
import { getPage } from "Models/cms";
import { CMS_CONTENT_SLUG } from "./transactionsBetsHistory.constants";

type ContentSelectorResult = Object => { [string]: string };

export const transactionsBetsHistoryContentSelector: ContentSelectorResult = createSelector(
  getPage(CMS_CONTENT_SLUG),
  pipe(
    pathOr([], ["fields", "text_fields"]),
    reduce(
      (acc, entry) => ({
        ...acc,
        [entry.key]: entry.value,
      }),
      {}
    )
  )
);
