// @flow
import * as React from "react";
import { TimeLimitsFormViewContainer } from "Components/Compliance/Sweden/TimeLimits";

type Props = {
  acceptModal: () => void,
};

export function TimeLimitsFormModal({ acceptModal }: Props) {
  return <TimeLimitsFormViewContainer onClickOutroCta={acceptModal} />;
}
