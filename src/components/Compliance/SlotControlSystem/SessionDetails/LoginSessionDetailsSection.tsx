// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import Text from "@casumo/cmp-text";
import {
  useLocale,
  useLoginSessionSummary,
  useTranslationsGql,
} from "Utils/hooks";
import { formatCurrency } from "Utils";
import { currencySelector } from "Models/handshake";
import { Row } from "./Row";

const cmsPrefix = "root:slot-control-system.after-playing:fields";

export function LoginSessionDetailsSection() {
  const { t } = useTranslationsGql({
    header: `${cmsPrefix}.login_session_details_header`,
    totalBets: `${cmsPrefix}.login_session_total_bets`,
    totalWins: `${cmsPrefix}.login_session_total_wins`,
  });
  const currency = useSelector(currencySelector);
  const locale = useLocale();
  const { loginSessionSummary } = useLoginSessionSummary();
  const formatCurrencyBound = (value: number) =>
    formatCurrency({
      value,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'unknown' is not assignable to type 'string'.
      currency,
      locale,
    });

  if (!loginSessionSummary) {
    return null;
  }

  return (
    <>
      <Text className="t-color-grey-50 u-padding--md u-padding-bottom--lg">
        {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'header' does not exist on type '{}'. */}
        {t.header}
      </Text>
      <Row
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalBets' does not exist on type '{}'.
        label={t.totalBets}
        value={formatCurrencyBound(Math.abs(loginSessionSummary.bets))}
      />
      <Row
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'totalWins' does not exist on type '{}'.
        label={t.totalWins}
        value={formatCurrencyBound(loginSessionSummary.winnings)}
      />
    </>
  );
}
