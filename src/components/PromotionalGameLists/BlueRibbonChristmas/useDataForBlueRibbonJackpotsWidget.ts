/**
 * DEPRECATED, TO BE REMOVED AFTER ALL
 * DEPENDENCIES ARE REPLACED WITH NEW DATA
 */

import * as R from "ramda";
import { useSelector } from "react-redux";
import { useFetch, useTranslations } from "Utils/hooks";
import { sdkPotsSelector } from "Models/blueribbonJackpots/jackpots.selectors";
import { urls, jackpotWidgetContentPage } from "./blueRibbonConsts";
import type {
  JackpotWidgetContentPage,
  JackpotStatus,
} from "./blueRibbonConsts";
import { useBlueRibbonSDKAnonymous } from "./useBlueRibbonSDK";

export type BlueRibbonJackpotEntry = {
  value: number;
  label: string;
  status: JackpotStatus;
  potId: string;
  communityWinRatio: number;
  mainWinRatio: number;
};

export function useDataForBlueRibbonJackpotsWidget() {
  const { response } = useFetch(urls.handshake);
  const t = useTranslations<JackpotWidgetContentPage>(jackpotWidgetContentPage);
  useBlueRibbonSDKAnonymous();
  const pots = useSelector(sdkPotsSelector);

  const available = R.propOr(false, "available", response);
  const jackpots: Array<BlueRibbonJackpotEntry> = R.pipe(
    R.pathOr([], ["jackpots", 0, "pots"]),
    R.map(({ communityWinRatio, mainWinRatio, potId, potName }) => ({
      value: pots[potId]?.progressive,
      label: potName,
      status: pots[potId]?.potStatus as JackpotStatus,
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
