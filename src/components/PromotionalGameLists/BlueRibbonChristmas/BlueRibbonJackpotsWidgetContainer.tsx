import Skeleton from "@casumo/cmp-skeleton";
import * as React from "react";
import * as R from "ramda";
import { topListWidgetWidth, topListWidgetHeight } from "Src/constants";
import { useFetch, useTranslations } from "Utils/hooks";
import { BlueRibbonJackpotsWidget } from "./BlueRibbonJackpotsWidget";
import { urls, jackpotWidgetContentPage } from "./blueRibbonConsts";
import type {
  JackpotWidgetContentPage,
  JackpotStatus,
} from "./blueRibbonConsts";
import {
  usePotStateChangeEvent,
  useBlueRibbonSDKAnonymous,
} from "./useBlueRibbonSDK";

type BlueRibbonJackpotEntry = {
  value: number;
  label: string;
  status: JackpotStatus;
  potId: string;
  communityWinRatio: number;
  mainWinRatio: number;
};

export const BlueRibbonJackpotsWidgetPromotionPage = () => (
  <div className="u-margin-x--md u-margin-bottom--lg">
    <BlueRibbonJackpotsWidgetContainer className="u-width--full" />
  </div>
);

export const BlueRibbonJackpotsWidgetContainer = React.memo<any>(
  ({ className = "" }: { className?: string }) => {
    const { response } = useFetch(urls.handshake);
    const t = useTranslations<JackpotWidgetContentPage>(
      jackpotWidgetContentPage
    );
    useBlueRibbonSDKAnonymous();
    const pots = usePotStateChangeEvent();

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

    if (!t || !available || !jackpots || jackpots.length === 0) {
      return (
        <Skeleton
          colorHi="#d3d8e1"
          colorLow="#e5eaed"
          viewBox={null}
          width={topListWidgetWidth}
          height={topListWidgetHeight}
        >
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
        </Skeleton>
      );
    }

    return (
      <BlueRibbonJackpotsWidget
        className={className}
        jackpots={jackpots}
        t={t}
      />
    );
  }
);
