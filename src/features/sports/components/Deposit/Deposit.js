// @flow
import * as React from "react";
import "./Deposit.scss";
import { AddIcon } from "@casumo/cmp-icons";
import { ButtonPrimary } from "@casumo/cmp-button";
import { useTranslations } from "Utils/hooks";
import { formatCurrency } from "Utils";
import tracker from "Services/tracker";
import { Mobile } from "Components/ResponsiveLayout";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { navigateToDeposit } from "Features/sports/utils";

export const CMS_SLUG = "welcome-offer-sports";

type Props = {
  hasDeposited: boolean,
  balance: number,
  bonus: number,
  locale: string,
  currency: string,
};

export const Deposit = ({
  hasDeposited,
  balance,
  bonus,
  locale,
  currency,
}: Props) => {
  const t = useTranslations("iframe-solution");

  if (!hasDeposited) {
    return null;
  }

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
    <Mobile>
      <div className="u-padding-top--md u-padding-x--md c-sport-deposit">
        <div className="t-background-white t-border-r t-elevation--10 u-padding-x--md u-padding-y u-margin-bottom u-display--flex">
          <div className="o-flex--vertical u-margin-right--lg">
            <div className="t-color-grey-50 u-font-sm">{t?.balance_title}</div>
            <div className="t-color-grey-90 u-font-md u-font-weight-bold">
              {balanceFormatted}
            </div>
          </div>
          {bonus > 0 && (
            <div className="o-flex--vertical t-color-grey-50 c-sport-deposit__bonus">
              <div className="u-font-sm">{t?.bonus_title}</div>
              <div className="u-font-md">{bonusFormatted}</div>
            </div>
          )}
          <div className="u-display--flex c-sport-deposit__separator" />
          <div className="o-flex-align--end">
            <ButtonPrimary size="sm" icon={<AddIcon />} onClick={goToDeposit} />
          </div>
        </div>
      </div>
    </Mobile>
  );
};
