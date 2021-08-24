import React from "react";
import {
  BlueRibbonJackpotsWidgetContainer,
  BlueRibbonManualOptInAndOptOut,
} from "Components/PromotionalGameLists/BlueRibbonChristmas";
import { useTranslations } from "Utils/hooks";
import { useBreakpointsWatch } from "Utils/hooks/useBreakpointsWatch";
import {
  JackpotDetailPage,
  TJackpotDetailsPageTranslations,
} from "./JackpotDetailPage";

type TProps = {
  jackpotSlug: string;
};

export const JackpotDetailPageContainer = ({ jackpotSlug }: TProps) => {
  const breakpoints = useBreakpointsWatch();

  const t = useTranslations<TJackpotDetailsPageTranslations>(
    `jackpots-details-pages.${jackpotSlug}`
  );

  const optIn = (
    <BlueRibbonManualOptInAndOptOut jackpotSlug={jackpotSlug} isLight={true} />
  );

  const widget = (
    <BlueRibbonJackpotsWidgetContainer jackpot_slug={jackpotSlug} />
  );

  return t ? (
    <JackpotDetailPage
      optInComponent={optIn}
      widgetComponent={widget}
      isMobile={!breakpoints.gtPhablet}
      jackpotSlug={jackpotSlug}
      t={{ ...t, tncLabel: t.tncLabel }}
    />
  ) : null;
};
