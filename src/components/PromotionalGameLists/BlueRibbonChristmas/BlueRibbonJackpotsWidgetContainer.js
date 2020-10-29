// @flow
import * as React from "react";
import * as R from "ramda";
import { useFetch, useTranslations } from "Utils/hooks";
import { BlueRibbonJackpotsWidget } from "./BlueRibbonJackpotsWidget";
import {
  urls,
  jackpotWidgetContentPage,
  type JackpotWidgetContentPage,
} from "./blueRibbonConsts";
import {
  usePotStateChangeEvent,
  useBlueRibbonSDKAnonymous,
} from "./useBlueRibbonSDK";

type BlueRibbonJackpotEntry = {
  value: number,
  label: string,
  status: "HOT" | "WARM" | "CHILLY",
  potId: string,
  communityWinRatio: number,
  mainWinRatio: number,
};

export function BlueRibbonJackpotsWidgetContainer({
  className = "",
}: {
  className?: string,
}) {
  const { response } = useFetch(urls.handshake);
  const t = useTranslations<JackpotWidgetContentPage>(jackpotWidgetContentPage);
  useBlueRibbonSDKAnonymous();
  const pots = usePotStateChangeEvent();

  const available = R.propOr(false, "available", response);
  const jackpots: Array<BlueRibbonJackpotEntry> = R.pipe(
    R.pathOr([], ["jackpots", 0, "pots"]),
    R.map(({ communityWinRatio, mainWinRatio, potId, potName }) => ({
      value: pots[potId]?.progressive,
      label: potName,
      status: pots[potId]?.potStatus,
      potId,
      communityWinRatio,
      mainWinRatio,
    })),
    R.filter(R.prop("value"))
  )(response);

  if (!t || !available || !jackpots || jackpots.length === 0) {
    return null;
  }

  return (
    <BlueRibbonJackpotsWidget className={className} jackpots={jackpots} t={t} />
  );
}
