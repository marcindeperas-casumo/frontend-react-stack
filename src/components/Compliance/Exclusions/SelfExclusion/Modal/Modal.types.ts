import React from "react";
import { TPlayOkaySuspendAccountTranslations } from "Models/playOkay";

export type TContentProps = {
  t: TPlayOkaySuspendAccountTranslations;
  validPeriods: Array<number>;
  selectedPeriod: number;
  selectPeriod: (n: number) => void;
};

export type TStepContent = React.FunctionComponent<TContentProps>;
