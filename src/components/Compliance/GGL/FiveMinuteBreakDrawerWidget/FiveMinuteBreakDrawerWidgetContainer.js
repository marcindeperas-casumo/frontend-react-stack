// @flow
import * as React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useTranslations, useJurisdiction } from "Utils/hooks";
import { fiveMinuteBreakSelector } from "Models/gglFiveMinuteBreak";
import { FiveMinuteBreakDrawerWidget } from "./FiveMinuteBreakDrawerWidget";

type Props = {
  className?: string,
};

export const FiveMinuteBreakDrawerWidgetContainer = ({ className }: Props) => {
  const { isGGL } = useJurisdiction();
  const { activeRCSession } = useSelector(
    fiveMinuteBreakSelector,
    shallowEqual
  );
  const t = useTranslations("ggl-five-minute-break");

  if (!isGGL || !activeRCSession || !t) {
    return null;
  }

  return (
    <div className={className}>
      <FiveMinuteBreakDrawerWidget
        t={t}
        timeLeft={activeRCSession.expiringTime}
        timeElapsed={activeRCSession.startedTime}
      />
    </div>
  );
};
