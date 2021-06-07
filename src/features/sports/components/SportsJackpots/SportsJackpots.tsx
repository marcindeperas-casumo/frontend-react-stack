import * as React from "react";
import { useSelector } from "react-redux";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import { useTranslations, useLocale } from "Utils/hooks";
import { SportsJackpotsTranslations } from "Features/sports/components/SportsJackpots/SportsJackpots.types";
import { isTestEnv, formatCurrency } from "Utils";
import { isMobile, isTablet } from "Components/ResponsiveLayout";
import {
  useComposedJackpotConfigData,
  useBlueRibbonAutoOptIn,
} from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { currencySelector } from "Models/handshake";
import "./SportsJackpots.scss";
import { navigateById, goToHash } from "Services/NavigationService";
import { MODAL } from "Features/sports/components/Modals";
import { OpenModalMutation } from "Features/sports/components/GraphQL";
import { PotsObjects } from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { SportsLoading } from "Features/sports/components/SportsLoading";

export const CMS_SLUG_CONFIG = "sports.sports-jackpots-component-config-page";
export const CMS_SLUG_JACKPOTS = "sports-jackpot";
export const JACKPOTS_GAME_SLUG = "kambi-sports";

const potWonInLastDay = (pot: PotsObjects, last_day: string) => {
  if (!pot || !pot.lastWinTs || !last_day) {
    return false;
  }
  return parseInt(last_day) <= pot.lastWinTs;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
export const SportsJackpots = () => {
  const t = useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG);
  const { composedJackpot } = useComposedJackpotConfigData({
    jackpotSlug: CMS_SLUG_JACKPOTS,
  });
  const locale = useLocale();
  const currency = useSelector(currencySelector);
  useBlueRibbonAutoOptIn(JACKPOTS_GAME_SLUG);

  if (
    !composedJackpot ||
    !t ||
    (isTestEnv() && t.enable_for_test === "false") ||
    (!isTestEnv() && t.enable_for_prod === "false")
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
        <div
          className={`c-sports-jackpots-gradient${
            isMobile() ? "mobile" : ""
          } bg-gradient-to-b from-transparent to-black u-padding-x--lg o-flex--vertical o-flex-justify--end u-padding-bottom--lg`}
        >
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
            <OpenModalMutation variables={{ modal: MODAL.JACKPOTS }}>
              {/* @ts-expect-error */}
              {openMoreInfoModal => (
                <ButtonSecondary
                  size="md"
                  className="u-margin-right"
                  onClick={() => openMoreInfoModal()}
                >
                  {t.more_info}
                </ButtonSecondary>
              )}
            </OpenModalMutation>
          </div>
        </div>
      </div>
      <div className="c-sports-jackpots-footer bg-black t-border-r-bottom-left--md t-border-r-bottom-right--md t-border-top t-border-grey-70">
        <div
          className={`u-width--1/2 u-height--full u-padding-x--lg u-padding-y--md t-border-right t-border-grey-70 ${
            potWonInLastDay(potMatch, t.last_day)
              ? "u-display--none"
              : "u-display--inline-block"
          }`}
        >
          <div className="capitalize u-font-xs">{t.match_drop}</div>
          {!potMatch || (potMatch && !potMatch.value) ? (
            <div className="u-margin-top--sm">
              <SportsLoading />
            </div>
          ) : (
            <div className="u-font-md u-font-weight-bold">
              {formatCurrency({ locale, currency, value: potMatch.value })}
            </div>
          )}
        </div>
        <div
          className={`u-width--1/2 u-height--full u-padding-x--lg u-padding-y--md ${
            potWonInLastDay(potMega, t.last_day)
              ? "u-display--none"
              : "u-display--inline-block"
          }`}
        >
          <div className="capitalize u-font-xs">{t.mega_drop}</div>
          {!potMega || (potMega && !potMega.value) ? (
            <div className="u-margin-top--sm">
              <SportsLoading />
            </div>
          ) : (
            <div className="u-font-md u-font-weight-bold">
              {formatCurrency({ locale, currency, value: potMega.value })}
            </div>
          )}
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
