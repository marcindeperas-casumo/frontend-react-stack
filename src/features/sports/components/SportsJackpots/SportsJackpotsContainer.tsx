import React from "react";
import { useSelector } from "react-redux";
import { useTranslations, useLocale } from "Utils/hooks";
import { SportsJackpotsTranslations } from "Features/sports/components/SportsJackpots/SportsJackpots.types";
import { useBlueRibbonAutoOptIn } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { currencySelector } from "Models/handshake";
import { useComposedJackpotConfigBySlug } from "Components/PromotionalGameLists/BlueRibbonChristmas/useComposedJackpot";
import { SportsJackpots } from "./SportsJackpots";

export const CMS_SLUG_CONFIG = "sports.sports-jackpots-component-config-page";
export const CMS_SLUG_JACKPOTS = "sports-jackpot";
export const JACKPOTS_GAME_SLUG = "kambi-sports";

export const SportsJackpotsContainer = () => {
  const t = useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG);
  const { composedJackpot } = useComposedJackpotConfigBySlug({
    slug: CMS_SLUG_JACKPOTS,
  });
  const locale = useLocale();
  const currency = useSelector(currencySelector);
  useBlueRibbonAutoOptIn(JACKPOTS_GAME_SLUG);

  return (
    <SportsJackpots
      composedJackpot={composedJackpot}
      currency={currency}
      locale={locale}
      t={t}
    />
  );
};
