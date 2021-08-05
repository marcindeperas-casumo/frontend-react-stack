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

  const jackpotConfigPage = useTranslations<{
    opt_in_t_and_c_apply: string;
  }>(`jackpots-configs.${jackpotSlug}`);

  const optIn = (
    <BlueRibbonManualOptInAndOptOut jackpotSlug={jackpotSlug} isLight={true} />
  );

  const widget = (
    <BlueRibbonJackpotsWidgetContainer jackpot_slug={jackpotSlug} />
  );

  return t && jackpotConfigPage ? (
    <JackpotDetailPage
      optInComponent={optIn}
      widgetComponent={widget}
      isMobile={!breakpoints.gtPhablet}
      jackpotSlug={jackpotSlug}
      t={{ ...t, tncLabel: jackpotConfigPage.opt_in_t_and_c_apply }}
    />
  ) : null;
};
