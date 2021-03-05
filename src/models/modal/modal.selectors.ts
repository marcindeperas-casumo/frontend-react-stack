import { createSelector } from "reselect";
import * as R from "ramda";

export const modalStateSelector = createSelector(R.prop("modal"), R.identity);

export const isModalHiddenSelector = createSelector(
  modalStateSelector,
  R.propEq("modalId", null)
);

export const isModalOpenSelector = R.pipe(isModalHiddenSelector, R.not);

export const isModalOpenToBeAcceptedSelector = createSelector(
  modalStateSelector,
  R.pathOr(false, ["config", "mustAccept"])
);
