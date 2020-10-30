// @flow
import * as React from "react";
import * as R from "ramda";
import { useFetch, useTranslations } from "Utils/hooks";
import { BlueRibbonJackpotsInGameWidget } from "./BlueRibbonJackpotsInGameWidget";
import {
  urls,
  jackpotWidgetContentPage,
  type JackpotWidgetContentPage,
} from "./blueRibbonConsts";
import { usePotStateChangeEvent } from "./useBlueRibbonSDK";

type BlueRibbonJackpotEntry = {
  value: number,
  label: string,
  status: "HOT" | "WARM" | "CHILLY",
  potId: string,
  communityWinRatio: number,
  mainWinRatio: number,
};

export function useDataForBlueRibbonJackpotsWidget() {
  const { response } = useFetch(urls.handshake);
  const t = useTranslations<JackpotWidgetContentPage>(jackpotWidgetContentPage);
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

  return {
    jackpots,
    t,
    available,
  };
}

export function BlueRibbonJackpotsInGameWidgetContainer({
  jackpots,
  t,
  available,
}: {
  jackpots: Array<BlueRibbonJackpotEntry>,
  t: ?JackpotWidgetContentPage,
  available: boolean,
}) {
  if (!t || !available || !jackpots || jackpots.length === 0) {
    return null;
  }

  return <BlueRibbonJackpotsInGameWidget jackpots={jackpots} t={t} />;
}
