import { connect, useSelector } from "react-redux";
import { useTranslations, useLocale } from "Utils/hooks";
import { SportsJackpotsTranslations } from "Features/sports/components/SportsJackpots/SportsJackpots.types";
import { useComposedJackpotConfigData } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { currencySelector } from "Models/handshake";
import { SportsJackpots } from "./SportsJackpots";

export const CMS_SLUG_CONFIG = "sports.sports-jackpots-component-config-page";
export const CMS_SLUG_JACKPOTS = "sports-jackpot";
export const JACKPOTS_GAME_SLUG = "kambi-sports";

export const SportsJackpotsContainer = connect(state => ({
  t: useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG),
  composedJackpot: useComposedJackpotConfigData({
    jackpotSlug: CMS_SLUG_JACKPOTS,
  }),
  locale: useLocale(),
  currency: useSelector(currencySelector),
}))(SportsJackpots);
