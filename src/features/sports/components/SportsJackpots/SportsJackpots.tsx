import * as React from "react";
import { useSelector } from "react-redux";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import {
  useTranslations,
  useLocale,
  useCrossCodebaseNavigation,
} from "Utils/hooks";
import { SportsJackpotsTranslations } from "Features/sports/components/SportsJackpots/SportsJackpots.types";
import { isTestEnv, formatCurrency } from "Utils";
import { isMobile, isTablet } from "Components/ResponsiveLayout";
import { useComposedJackpotConfigData } from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { currencySelector } from "Models/handshake";
import "./SportsJackpots.scss";
import { navigateById } from "Services/NavigationService";

const CMS_SLUG_CONFIG = "sports.sports-jackpots-component-config-page";
const CMS_SLUG_JACKPOTS = "sports-jackpot";

// eslint-disable-next-line fp/no-mutation
const goToHash = (hash: string) => (window.location.hash = hash);

export const SportsJackpots = () => {
  const t = useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG);
  const { composedJackpot } = useComposedJackpotConfigData({
    jackpotSlug: CMS_SLUG_JACKPOTS,
  });
  const locale = useLocale();
  const currency = useSelector(currencySelector);
  const { navigateToKO } = useCrossCodebaseNavigation();

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
    <div className="c-sports-jackpots u-margin--md color-white u-margin-bottom--sm">
      <div
        className="c-sports-jackpots-content bg-no-repeat bg-cover t-border-r-top-left--md t-border-r-top-right--md"
        style={{ backgroundImage: `url('${backgroundImage()}'` }}
      >
        <div className="c-sports-jackpots-gradient bg-gradient-to-b from-transparent to-black u-padding-x--lg o-flex--vertical o-flex-justify--end u-padding-bottom--lg">
          <div className="u-font-lg u-font-weight-bold">{t.title}</div>
          <div className="u-margin-top--md">{t.description}</div>
          <div className="u-margin-top--md">
            <ButtonPrimary
              size="md"
              className="u-margin-right"
              onClick={() => {
                goToHash(t.view_odds_link);
              }}
            >
              {t.view_odds}
            </ButtonPrimary>
            <ButtonSecondary
              size="md"
              className="u-margin-right"
              onClick={() => {}}
            >
              {t.more_info}
            </ButtonSecondary>
          </div>
        </div>
      </div>
      <div className="c-sports-jackpots-footer bg-black t-border-r-bottom-left--md t-border-r-bottom-right--md t-border-top t-border-grey-70">
        <div className="u-width--1/2 u-display--inline-block u-height--full u-padding-x--lg u-padding-y--md t-border-right t-border-grey-70">
          <div className="capitalize u-font-xs">{t.match_drop}</div>
          <div
            className={`u-font-md u-font-weight-bold ${
              !potMatch || (potMatch && !potMatch.value)
                ? "color-grey-dark"
                : ""
            }`}
          >
            {formatCurrency({ locale, currency, value: potMatch.value })}
          </div>
        </div>
        <div className="u-width--1/2 u-display--inline-block u-height--full u-padding-x--lg u-padding-y--md">
          <div className="capitalize u-font-xs">{t.mega_drop}</div>
          <div
            className={`u-font-md u-font-weight-bold ${
              !potMega || (potMega && !potMega.value) ? "color-grey-dark" : ""
            }`}
          >
            {formatCurrency({ locale, currency, value: potMega.value })}
          </div>
        </div>
      </div>
      <div className="c-sports-jackpots-tc color-grey-dark u-margin-top u-font-xs">
        {t.footer_text}
        <div
          className="u-margin-left--sm u-display--inline-block cursor-pointer underline"
          onClick={() => navigateById({ routeId: t.footer_tc_link })}
        >
          {t.footer_tc_text}
        </div>
      </div>
    </div>
  );
};
