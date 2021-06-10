import React from "react";
import { connect, useSelector } from "react-redux";
import { useTranslations, useLocale } from "Utils/hooks";
import { SportsJackpotsTranslations } from "Features/sports/components/SportsJackpots/SportsJackpots.types";
import { useBlueRibbonAutoOptIn, useComposedJackpotConfigData } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { currencySelector } from "Models/handshake";
import { SportsJackpots } from "./SportsJackpots";

export const CMS_SLUG_CONFIG = "sports.sports-jackpots-component-config-page";
export const CMS_SLUG_JACKPOTS = "sports-jackpot";
export const JACKPOTS_GAME_SLUG = "kambi-sports";

export const SportsJackpotsContainer = () => {
  const t = useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG);
  const { composedJackpot } = useComposedJackpotConfigData({
    jackpotSlug: CMS_SLUG_JACKPOTS,
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
  )

};

// const t = useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG);
// const composedJackpot =  useComposedJackpotConfigData({
//   jackpotSlug: CMS_SLUG_JACKPOTS,
// });
// const locale = useLocale();

// export const SportsJackpotsContainer = connect(state => ({
//   t: useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG),
//   composedJackpot: useComposedJackpotConfigData({
//     jackpotSlug: CMS_SLUG_JACKPOTS,
//   }),
//   locale: useLocale(),
//   currency: currencySelector(state),
// }))(SportsJackpots);

// export const SportsJackpotsContainer = () => {
//   const t = useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG);
//   const composedJackpot = useComposedJackpotConfigData({
//     jackpotSlug: CMS_SLUG_JACKPOTS,
//   });
//   const locale = useLocale();
//   const currency = useSelector(currencySelector);

//   return (<SportsJackpots/>);

// };