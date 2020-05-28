// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as R from "ramda";
import {
  loginTimeLimitsSelector,
  saveTimeLimitsAction,
  type LoginTimeLimits,
} from "Models/playOkay";
import { TimeLimitsFormView } from "./TimeLimitsFormView";

type Props = {
  onClickOutroCta: () => void,
};

export function TimeLimitsFormViewContainer({ onClickOutroCta }: Props) {
  const dispatch = useDispatch();
  const loginTimeLimits = useSelector<LoginTimeLimits>(loginTimeLimitsSelector);

  return (
    <TimeLimitsFormView
      initial={R.isEmpty(loginTimeLimits)}
      onClickOutroCta={onClickOutroCta}
      onClickFormCta={(limits: LoginTimeLimits) =>
        dispatch(saveTimeLimitsAction(limits))
      }
    />
  );
}
