// @flow
import * as R from "ramda";
import { useFetch, useTranslations } from "Utils/hooks";
import {
  urls,
  jackpotWidgetContentPage,
  type JackpotWidgetContentPage,
  type JackpotStatus,
} from "./blueRibbonConsts";
import { usePotStateChangeEvent } from "./useBlueRibbonSDK";

export type BlueRibbonJackpotEntry = {
  value: number,
  label: string,
  status: JackpotStatus,
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
