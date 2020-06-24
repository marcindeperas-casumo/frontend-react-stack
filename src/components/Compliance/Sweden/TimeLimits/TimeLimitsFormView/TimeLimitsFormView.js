// @flow
import * as React from "react";
import { TimeLimitsFormIntroContainer } from "../TimeLimitsFormIntro";
import { TimeLimitsFormOutroContainer } from "../TimeLimitsFormOutro";
import { TimeLimitsFormContainer } from "../TimeLimitsForm";

type Props = {
  initial?: boolean,
  onClickOutroCta: () => void,
};

const SCREENS = {
  INTRO: "INTRO",
  FORM: "FORM",
  OUTRO: "OUTRO",
};

export function TimeLimitsFormView({
  initial = false,
  onClickOutroCta,
}: Props) {
  const [screen, setScreen] = React.useState(
    initial ? SCREENS.INTRO : SCREENS.FORM
  );

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

  return (
    <TimeLimitsFormContainer onLimitsSaved={() => setScreen(SCREENS.OUTRO)} />
  );
}
