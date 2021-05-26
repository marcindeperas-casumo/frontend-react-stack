import * as React from "react";
import Text from "@casumo/cmp-text";
import { useSelector } from "react-redux";
import { ButtonPrimary } from "@casumo/cmp-button";
import { useLocale } from "Utils/hooks";
import type { ModalContentComponent } from "Components/RSModal";
import { SportsJackpotsTranslations } from "Features/sports/components/SportsJackpots/SportsJackpots.types";
import "./SportsJackpots.scss";
import { formatCurrency, stringToHTML } from "Utils";
import { currencySelector } from "Models/handshake";

export function SportsJackpots(props: ModalContentComponent<{}>) {
  const locale = useLocale();
  const currency = useSelector(currencySelector);

  if (
    !props.config.input.t ||
    !props.config.input.potMega ||
    !props.config.input.potMatch
  ) {
    return null;
  }

  const t: SportsJackpotsTranslations = props.config.input.t;
  const potMega = props.config.input.potMega;
  const potMatch = props.config.input.potMatch;
  // eslint-disable-next-line fp/no-mutation
  const goToHash = (hash: string) => (window.location.hash = hash);

  return (
    <>
      <div className="c-sports-jackpots-modal-header bg-purple-80" />
      <div className="u-padding--md">
        <Text
          size="2xlg"
          className="u-font-weight-bold u-text-align-center u-margin-bottom--md"
        >
          {t.modal_title}
        </Text>
        <Text dangerouslySetInnerHTML={stringToHTML(t.modal_content)} />
        <div className="bg-purple-80 t-border-r color-white u-margin-y--md">
          <div className="u-width--1/2 u-display--inline-block u-height--full u-padding-x--lg u-padding-y--md t-border-right t-border-grey-70">
            <Text tag="div" size="2xs">
              {t.match_drop}
            </Text>
            <Text tag="div" size="md" className="u-font-weight-bold">
              {formatCurrency({ locale, currency, value: potMatch.value })}
            </Text>
          </div>
          <div className="u-width--1/2 u-display--inline-block u-height--full u-padding-x--lg u-padding-y--md ">
            <Text tag="div" size="2xs">
              {t.mega_drop}
            </Text>
            <Text tag="div" size="md" className="u-font-weight-bold">
              {formatCurrency({ locale, currency, value: potMega.value })}
            </Text>
          </div>
        </div>
        <Text size="xs" tag="div" className="text-grey-50">
          {t.modal_conditions}
        </Text>
        <ButtonPrimary
          size="md"
          className="u-width--full u-margin-y--md"
          onClick={() => {
            goToHash(t.view_odds_link);
            props.closeModal();
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
    </>
  );
}
