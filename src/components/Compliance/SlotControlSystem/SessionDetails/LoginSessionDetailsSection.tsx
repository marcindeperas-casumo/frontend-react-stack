import Text from "@casumo/cmp-text";
import * as React from "react";
import { useSelector } from "react-redux";
import { useLocale, useTranslationsGql } from "Utils/hooks";
import { formatCurrency } from "Utils";
import { currencySelector } from "Models/handshake";
import { TLoginSessionSummary } from "Models/loginSession";
import { Row } from "./Row";

const cmsPrefix = "root:slot-control-system.after-playing:fields";

type Props = {
  loginSessionSummary: TLoginSessionSummary;
};

export function LoginSessionDetailsSection({ loginSessionSummary }: Props) {
  const { t } = useTranslationsGql({
    header: `${cmsPrefix}.login_session_details_header`,
    totalBets: `${cmsPrefix}.login_session_total_bets`,
    totalWins: `${cmsPrefix}.login_session_total_wins`,
  });
  const currency = useSelector(currencySelector);
  const locale = useLocale();
  const formatCurrencyBound = (value: number) =>
    formatCurrency({
      value,
      currency,
      locale,
    });

  return (
    <>
      <Text className="text-grey-50 u-padding--md u-padding-bottom--lg">
        {t.header}
      </Text>
      <Row
        label={t.totalBets}
        value={formatCurrencyBound(Math.abs(loginSessionSummary.bets))}
      />
      <Row
        label={t.totalWins}
        value={formatCurrencyBound(loginSessionSummary.winnings)}
      />
    </>
  );
}
