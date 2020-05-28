// @flow
import * as React from "react";
import { type LoginTimeLimits } from "Models/playOkay";
import { TimeLimitsFormIntroContainer } from "../TimeLimitsFormIntro";
import { TimeLimitsFormOutroContainer } from "../TimeLimitsFormOutro";
import { TimeLimitsFormContainer } from "../TimeLimitsForm";

type Props = {
  initial?: boolean,
  onClickOutroCta: () => void,
  onClickFormCta: (limits: LoginTimeLimits) => void,
};

const SCREENS = {
  INTRO: "INTRO",
  FORM: "FORM",
  OUTRO: "OUTRO",
};

export function TimeLimitsFormView({
  initial = false,
  onClickOutroCta,
  onClickFormCta,
}: Props) {
  const [screen, setScreen] = React.useState(
    initial ? SCREENS.INTRO : SCREENS.FORM
  );
  const onClickFormCtaWrapper = (limits: LoginTimeLimits) => {
    onClickFormCta(limits);
    setScreen(SCREENS.OUTRO);
  };

  if (screen === SCREENS.INTRO) {
    return (
      <TimeLimitsFormIntroContainer
        onClickCta={() => setScreen(SCREENS.FORM)}
      />
    );
  }

  if (screen === SCREENS.OUTRO) {
    return <TimeLimitsFormOutroContainer onClickCta={onClickOutroCta} />;
  }

  return <TimeLimitsFormContainer onClickCta={onClickFormCtaWrapper} />;
}
