// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import {
  useLocale,
  useLoginSessionSummary,
  useTranslationsGql,
} from "Utils/hooks";
import { formatCurrency } from "Utils";
import { currencySelector } from "Models/handshake";
import { Row } from "./Row";

export function LoginSessionDetailsSection() {
  const { t } = useTranslationsGql({
    totalBets:
      "root:slot-control-system.after-playing:fields.login_session_total_bets",
    totalWins:
      "root:slot-control-system.after-playing:fields.login_session_total_wins",
  });
  const currency = useSelector(currencySelector);
  const locale = useLocale();
  const { loginSessionSummary } = useLoginSessionSummary();
  const formatCurrencyBound = (value: number) =>
    formatCurrency({
      value,
      currency,
      locale,
    });

  if (!loginSessionSummary) {
    return null;
  }

  return (
    <>
      <Row
        label={t.totalBets}
        value={formatCurrencyBound(loginSessionSummary.totalBets)}
      />
      <Row
        label={t.totalWins}
        value={formatCurrencyBound(loginSessionSummary.totalWins)}
      />
    </>
  );
}
