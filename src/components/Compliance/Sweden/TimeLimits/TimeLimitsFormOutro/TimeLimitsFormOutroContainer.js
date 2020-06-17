// @flow
import * as React from "react";
import { TimeLimitsFormOutro } from "./TimeLimitsFormOutro";
import cmsMock from "./__mocks__/cms";

type Props = {
  onClickCta: () => void,
};

export function TimeLimitsFormOutroContainer({ onClickCta }: Props) {
  return <TimeLimitsFormOutro t={cmsMock} onClickCta={onClickCta} />;
}
