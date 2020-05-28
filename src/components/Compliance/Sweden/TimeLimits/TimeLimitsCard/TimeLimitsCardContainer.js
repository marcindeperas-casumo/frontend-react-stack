// @flow
import * as React from "react";
import { useDispatch } from "react-redux";
import { showModal } from "Models/modal";
import { REACT_APP_MODAL } from "Src/constants";
import { TimeLimitsCard } from "./TimeLimitsCard";

export function TimeLimitsCardContainer() {
  const dispatch = useDispatch();

  return (
    <TimeLimitsCard
      onClick={() => dispatch(showModal(REACT_APP_MODAL.ID.TIME_LIMITS_FORM))}
    />
  );
}
