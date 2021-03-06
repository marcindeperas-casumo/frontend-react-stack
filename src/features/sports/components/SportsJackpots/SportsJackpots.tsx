import * as React from "react";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import Skeleton from "@casumo/cmp-skeleton";
import { SportsJackpotsTranslations } from "Features/sports/components/SportsJackpots/SportsJackpots.types";
import { isTestEnv, formatCurrency } from "Utils";
import { isMobile, isTablet } from "Components/ResponsiveLayout";
import "./SportsJackpots.scss";
import { navigateById, goToHash } from "Services/NavigationService";
import { MODAL } from "Features/sports/components/Modals";
import { OpenModalMutation } from "Features/sports/components/GraphQL";
import type {
  ComposedJackpot,
  PotObject,
} from "Components/PromotionalGameLists/BlueRibbonChristmas/blueRibbonConsts";
import { TCurrencyCode } from "Src/constants";

const potWonInLastDay = (pot: PotObject, last_day: string) => {
  if (!pot || !pot.lastWinTs || !last_day) {
    return false;
  }
  return parseInt(last_day) <= pot.lastWinTs;
};

type Props = {
  t: SportsJackpotsTranslations;
  composedJackpot: ComposedJackpot;
  locale: string;
  currency: TCurrencyCode;
};

export const SportsJackpots = ({
  t,
  composedJackpot,
  locale,
  currency,
}: // eslint-disable-next-line sonarjs/cognitive-complexity
Props) => {
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

  return !potWonInLastDay(potMatch, t.last_day) ||
    !potWonInLastDay(potMega, t.last_day) ? (
    <div className="c-sports-jackpots u-margin--md text-white u-margin-bottom--sm">
      <div
        className="c-sports-jackpots-content bg-no-repeat bg-cover t-border-r-top-left--md t-border-r-top-right--md"
        style={{ backgroundImage: `url('${backgroundImage()}'` }}
      >
        <div
          className={`c-sports-jackpots-gradient${
            isMobile() ? "mobile" : ""
          } bg-gradient-to-b from-transparent to-grey-90 u-padding-x--lg o-flex--vertical o-flex-justify--end u-padding-bottom--lg`}
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
      <div className="bg-grey-90 t-border-r-bottom-left--md t-border-r-bottom-right--md t-border-top t-border-grey-70">
        <div className="u-width--1/2 u-height--full u-padding-x--lg u-padding-y--md t-border-right t-border-grey-70 u-display--inline-block">
          <div className="capitalize u-font-xs">
            <Text tag="span">{t.match_drop}</Text>
            {potWonInLastDay(potMatch, t.last_day) && (
              <div className="u-display--inline-block">
                <Text tag="span" className="u-margin-right u-margin-left">
                  -
                </Text>
                <Text tag="span" className="capitalize text-yellow-30">
                  {t.dropped}
                </Text>
              </div>
            )}
          </div>
          {!potMatch?.value ? (
            <Skeleton
              width="114"
              height="22"
              colorLow="#444E5D"
              colorHi="#262626"
              className="rounded u-margin-top--sm"
            >
              <rect x="0" y="0" rx="0" ry="0" width="114" height="22" />
            </Skeleton>
          ) : (
            <div className="u-font-md u-font-weight-bold u-margin-right">
              {formatCurrency({ locale, currency, value: potMatch.value })}
            </div>
          )}
        </div>
        <div className="u-width--1/2 u-height--full u-padding-x--lg u-padding-y--md u-display--inline-block">
          <div className="capitalize u-font-xs">
            <Text tag="span">{t.mega_drop}</Text>
            {potWonInLastDay(potMega, t.last_day) && (
              <div className="u-display--inline-block">
                <Text tag="span" className="u-margin-right u-margin-left">
                  -
                </Text>
                <Text tag="span" className="capitalize text-yellow-30">
                  {t.dropped}
                </Text>
              </div>
            )}
          </div>
          {!potMega?.value ? (
            <Skeleton
              width="114"
              height="22"
              colorLow="#444E5D"
              colorHi="#262626"
              className="rounded u-margin-top--sm"
            >
              <rect x="0" y="0" rx="0" ry="0" width="114" height="22" />
            </Skeleton>
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
  ) : null;
};
