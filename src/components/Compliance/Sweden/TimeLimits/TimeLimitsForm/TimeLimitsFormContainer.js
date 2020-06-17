// @flow
import * as React from "react";
import { type LoginTimeLimits } from "Models/playOkay";
import { TimeLimitsForm } from "./TimeLimitsForm";
import cmsMock from "./__mocks__/cms";

type Props = {
  onClickCta: (limits: LoginTimeLimits) => void,
};

export function TimeLimitsFormContainer({ onClickCta }: Props) {
  return <TimeLimitsForm t={cmsMock} onClickCta={onClickCta} />;
}
