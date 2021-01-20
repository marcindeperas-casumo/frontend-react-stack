// @flow
import * as React from "react";
import { useTranslations, useJurisdiction } from "Utils/hooks";
import { FiveMinuteBreakDrawerWidget } from "./FiveMinuteBreakDrawerWidget";

type Props = {
  className?: string,
};

export const FiveMinuteBreakDrawerWidgetContainer = ({ className }: Props) => {
  const { isGGL } = useJurisdiction();

  const t = useTranslations("ggl-five-minute-break");

  if (!isGGL) {
    return null;
  }

  return (
    <div className={className}>
      <FiveMinuteBreakDrawerWidget
        t={t}
        timeLeft={Date.now() + 60 * 1000}
        timeElapsed={Date.now()}
      />
    </div>
  );
};
