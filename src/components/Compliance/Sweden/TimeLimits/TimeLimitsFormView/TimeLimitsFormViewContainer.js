// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { allLoginTimeLimitsDefinedSelector } from "Models/playOkay";
import { TimeLimitsFormView } from "./TimeLimitsFormView";

type Props = {
  onClickOutroCta: () => void,
};

export function TimeLimitsFormViewContainer({ onClickOutroCta }: Props) {
  const limitsDefined = useSelector(allLoginTimeLimitsDefinedSelector);

  return (
    <TimeLimitsFormView
      initial={!limitsDefined}
      onClickOutroCta={onClickOutroCta}
    />
  );
}
