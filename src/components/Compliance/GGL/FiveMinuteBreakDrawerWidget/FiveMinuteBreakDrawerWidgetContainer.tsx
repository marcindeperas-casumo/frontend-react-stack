import * as React from "react";
import { useSelector, shallowEqual } from "react-redux";
import { useTranslations, useJurisdiction } from "Utils/hooks";
import { fiveMinuteBreakSelector } from "Models/gglFiveMinuteBreak";
import { FiveMinuteBreakDrawerWidget } from "./FiveMinuteBreakDrawerWidget";

type Props = {
  className?: string;
};

export const FiveMinuteBreakDrawerWidgetContainer = ({ className }: Props) => {
  const { isGGL } = useJurisdiction();
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeRCSession' does not exist on type ... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
        t={t}
        timeLeft={activeRCSession.expiringTime}
        timeElapsed={activeRCSession.startedTime}
      />
    </div>
  );
};
