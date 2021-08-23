import "./Deposit.scss";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";
import { useTranslations } from "Utils/hooks";
import { formatCurrency } from "Utils";
import tracker from "Services/tracker";
import { EVENTS, EVENT_PROPS, TCurrencyCode } from "Src/constants";
import { navigateToDeposit } from "../utils";

type DepositTranslations = {
  bonus_title: string | undefined;
  cta_deposit: string | undefined;
};

type Props = {
  balance: number;
  bonus: number;
  locale: string;
  currency: TCurrencyCode;
};

export const Deposit = ({ balance, bonus, locale, currency }: Props) => {
  const t = useTranslations<DepositTranslations>("iframe-solution");

  const balanceFormatted = formatCurrency({
    locale,
    currency,
    value: balance,
  });

  const bonusFormatted = formatCurrency({
    locale,
    currency,
    value: bonus,
  });

  const goToDeposit = () => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_DEPOSIT_CLICKED, {
      [EVENT_PROPS.BALANCE]: balance,
    });
    navigateToDeposit();
  };

  return (
    <div className="bg-white t-border-r t-elevation--10 u-padding-x--md u-padding-y u-margin u-display--flex">
      <div className="u-display--flex o-flex--vertical">
        <div className="u-margin-right--lg text-grey-70 u-font-md u-font-weight-bold">
          {balanceFormatted}
        </div>
        <div className="text-grey-50 c-sport-deposit__bonus u-font-sm u-font-weight-bold">
          +{bonusFormatted} {t?.bonus_title}
        </div>
      </div>
      <div className="u-display--flex u-display--flex-end c-sport-deposit__separator" />
      <div className="o-flex-align--end">
        <ButtonPrimary size="md" onClick={goToDeposit}>
          {t?.cta_deposit}
        </ButtonPrimary>
      </div>
    </div>
  );
};
