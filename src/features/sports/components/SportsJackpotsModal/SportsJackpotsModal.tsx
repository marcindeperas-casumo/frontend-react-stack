import * as React from "react";
import { useSelector } from "react-redux";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { SportsModal } from "Features/sports/components/SportsModal";
import { useLocale, useTranslations } from "Utils/hooks";
import { SportsJackpotsTranslations } from "Features/sports/components/SportsJackpots/SportsJackpots.types";
import {
  useComposedJackpotConfigData,
  useBlueRibbonAutoOptIn,
} from "Components/PromotionalGameLists/BlueRibbonChristmas/useBlueRibbonSDK";
import { currencySelector } from "Models/handshake";
import { goToHash } from "Services/NavigationService";
import { formatCurrency, stringToHTML } from "Utils";
import { SportsLoading } from "Features/sports/components/SportsLoading";
import {
  CMS_SLUG_CONFIG,
  CMS_SLUG_JACKPOTS,
  JACKPOTS_GAME_SLUG,
} from "../SportsJackpots";

type Props = {
  onClose: (e: any) => void;
};

export const SportsJackpotsModal = ({ onClose }: Props) => {
  const t = useTranslations<SportsJackpotsTranslations>(CMS_SLUG_CONFIG);
  const { composedJackpot } = useComposedJackpotConfigData({
    jackpotSlug: CMS_SLUG_JACKPOTS,
  });
  useBlueRibbonAutoOptIn(JACKPOTS_GAME_SLUG);
  const locale = useLocale();
  const currency = useSelector(currencySelector);

  if (!composedJackpot || !t) {
    return null;
  }

  const potMatch = composedJackpot.pots.find(
    pot => pot.potKey === t.potid_match
  );
  const potMega = composedJackpot.pots.find(pot => pot.potKey === t.potid_mega);

  return (
    <SportsModal>
      <SportsModal.Header onClose={onClose}>{t.modal_title}</SportsModal.Header>
      <SportsModal.Content>
        <div className="u-padding--md">
          <Text dangerouslySetInnerHTML={stringToHTML(t.modal_content)} />
          <div className="bg-purple-80 t-border-r color-white u-margin-y--md">
            <div className="u-width--1/2 u-display--inline-block u-height--full u-padding-x--lg u-padding-y--md t-border-right t-border-grey-70">
              <Text tag="div" size="2xs">
                {t.match_drop}
              </Text>
              {!potMatch || (potMatch && !potMatch.value) ? (
                <div className="u-margin-top--sm">
                  <SportsLoading />
                </div>
              ) : (
                <Text tag="div" size="md" className="u-font-weight-bold">
                  {formatCurrency({ locale, currency, value: potMatch.value })}
                </Text>
              )}
            </div>
            <div className="u-width--1/2 u-display--inline-block u-height--full u-padding-x--lg u-padding-y--md ">
              <Text tag="div" size="2xs">
                {t.mega_drop}
              </Text>
              {!potMega || (potMega && !potMega.value) ? (
                <div className="u-margin-top--sm">
                  <SportsLoading />
                </div>
              ) : (
                <Text tag="div" size="md" className="u-font-weight-bold">
                  {formatCurrency({ locale, currency, value: potMega.value })}
                </Text>
              )}
            </div>
          </div>
          <Text size="xs" tag="div" className="text-grey-50">
            {t.modal_conditions}
          </Text>
          <ButtonPrimary
            size="md"
            className="u-width--full u-margin-y--md"
            onClick={e => {
              goToHash(t.view_odds_link);
              onClose(e);
            }}
          >
            {t.modal_cta}
          </ButtonPrimary>
          <Text
            size="2xs"
            className="text-grey-50"
            dangerouslySetInnerHTML={stringToHTML(t.modal_footer)}
          />
        </div>
      </SportsModal.Content>
    </SportsModal>
  );
};
