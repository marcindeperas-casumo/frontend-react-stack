import * as React from "react";
import { useSelector } from "react-redux";
import { useTranslations, useLocale } from "Utils/hooks";
import { SportsJackpotsTranslations } from "Features/sports/components/SportsJackpots/SportsJackpots.types";
import { isTestEnv, formatCurrency } from "Utils";
import { isMobile, isTablet } from "Components/ResponsiveLayout";
import { useComposedJackpotConfigData } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { currencySelector } from "Models/handshake";
import "./SportsJackpots.scss";

const CMS_SLUG_CONFIG = "sports.sports-jackpots-component-config-page";
const CMS_SLUG_JACKPOTS = "sports-jackpot";

export const SportsJackpots = () => {
  const t = useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG);
  const { composedJackpot } = useComposedJackpotConfigData({
    jackpotSlug: CMS_SLUG_JACKPOTS,
  });
  const locale = useLocale();
  const currency = useSelector(currencySelector);

  if (
    !composedJackpot ||
    !t ||
    (t && isTestEnv() && t.enable_for_test === false) ||
    (t && !isTestEnv() && t.enable_for_prod === false)
  ) {
    return null;
  }

  const backgroundImage = () => {
    if (isMobile()) {
      return t.background_mobile.url;
    }
    if (isTablet()) {
      return t.background_tablet.url;
    }
    return t.background_desktop.url;
  };

  const potMatch = composedJackpot.pots.find(
    pot => pot.potKey === t.potid_match
  );
  const potMega = composedJackpot.pots.find(pot => pot.potKey === t.potid_mega);

  return (
    <div
      className="c-sports-jackpots bg-center bg-gradient-to-b"
      style={{ backgroundImage: `url('${backgroundImage()}'` }}
    >
      <div>
        match: {formatCurrency({ locale, currency, value: potMatch.value })}
      </div>
      <div>
        mega: {formatCurrency({ locale, currency, value: potMega.value })}
      </div>
    </div>
  );
};
