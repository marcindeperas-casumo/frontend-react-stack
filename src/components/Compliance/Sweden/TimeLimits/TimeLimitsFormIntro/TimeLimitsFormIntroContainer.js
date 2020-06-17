// @flow
import * as React from "react";
import { TimeLimitsFormIntro } from "./TimeLimitsFormIntro";
import cmsMock from "./__mocks__/cms";

type Props = {
  onClickCta: () => void,
};

export function TimeLimitsFormIntroContainer({ onClickCta }: Props) {
  return <TimeLimitsFormIntro t={cmsMock} onClickCta={onClickCta} />;
}
