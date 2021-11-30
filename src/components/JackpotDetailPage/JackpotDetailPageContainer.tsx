import React from "react";
import sortBy from "lodash/sortBy";
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
  const promotionListsSlugs = t?.content_builder;

  const optIn = (
    <BlueRibbonManualOptInAndOptOut jackpotSlug={jackpotSlug} isLight={true} />
  );

  const widget = (
    <BlueRibbonJackpotsWidgetContainer jackpot_slug={jackpotSlug} />
  );
  if (promotionListsSlugs) {
    const alteredList = promotionListsSlugs.map(obj => ({
      ...obj,
      hideShowMoreLink: true,
    }));

    const prioritizedLists = sortBy(alteredList);

    return (
      <JackpotDetailPage
        optInComponent={optIn}
        widgetComponent={widget}
        isMobile={!breakpoints.gtPhablet}
        jackpotSlug={jackpotSlug}
        promotionLists={prioritizedLists}
        t={t}
      />
    );
  }
  return null;
};
