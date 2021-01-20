// @flow
import * as React from "react";
import { equals } from "ramda";
import { useSelector, shallowEqual } from "react-redux";
import { useJurisdiction } from "Utils/hooks";
import { fiveMinuteBreakSelector } from "Models/gglFiveMinuteBreak";
import { useTimeoutFn } from "Utils/hooks/useTimeoutFn";
import { useSumoIcon } from "Components/SumoIcon/useSumoIconHook";
import { useAdventurerContext } from "Components/GamePage/Contexts/AdventurerContext";
import { FiveMinuteBreakIcon } from "Components/Compliance/GGL/FiveMinuteBreakIcon";
import type { GglRealityCheckSummary } from "./fiveMinuteBreak.types";
import { YEAR_10K_TIMESTAMP } from "./fiveMinuteBreak.constants";

const isFallbackValue = equals(YEAR_10K_TIMESTAMP);

export function useFiveMinuteBreakIcon() {
  const { isGGL } = useJurisdiction();
  const { activeRCSession }: GglRealityCheckSummary = useSelector(
    fiveMinuteBreakSelector,
    shallowEqual
  );
  const expiringTime = activeRCSession?.expiringTime || YEAR_10K_TIMESTAMP;
  const { progressPercentage } = useAdventurerContext();
  const { addIcon, removeIcon, hasIcon } = useSumoIcon({
    progressPercentage,
    expiringTime,
  });
  const [isTimeToShowIcon, setIsTimeToShowIcon] = React.useState(false);
  const timer = useTimeoutFn();

  React.useEffect(() => {
    if (!isGGL || isFallbackValue(expiringTime) || isTimeToShowIcon) {
      return;
    }

    const slightlyAboveOneMinuteLeft = expiringTime - 65 * 1000;
    const isSlightlyAboveOneMinuteLeftNow =
      slightlyAboveOneMinuteLeft <= Date.now();

    setIsTimeToShowIcon(isSlightlyAboveOneMinuteLeftNow);

    if (isSlightlyAboveOneMinuteLeftNow) {
      return;
    }

    timer.scheduleAt(() => {
      setIsTimeToShowIcon(true);
    }, slightlyAboveOneMinuteLeft);

    return () => timer.clear();
  }, [expiringTime, isGGL, isTimeToShowIcon, timer]);

  React.useEffect(() => {
    if (!isGGL || isFallbackValue(expiringTime)) {
      return;
    }

    if (isTimeToShowIcon && !hasIcon()) {
      addIcon(FiveMinuteBreakIcon);
    } else if (!isTimeToShowIcon && hasIcon()) {
      removeIcon();
    }
  }, [addIcon, hasIcon, removeIcon, isTimeToShowIcon, expiringTime, isGGL]);
}
