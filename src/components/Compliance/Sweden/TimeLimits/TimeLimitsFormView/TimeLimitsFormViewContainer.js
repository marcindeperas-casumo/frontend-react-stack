// @flow
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
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
  const loginTimeLimits = useSelector<LoginTimeLimits | void>(
    loginTimeLimitsSelector
  );

  return (
    <TimeLimitsFormView
      initial={!Boolean(loginTimeLimits)}
      onClickOutroCta={onClickOutroCta}
      onClickFormCta={(limits: LoginTimeLimits) =>
        dispatch(saveTimeLimitsAction(limits))
      }
    />
  );
}
