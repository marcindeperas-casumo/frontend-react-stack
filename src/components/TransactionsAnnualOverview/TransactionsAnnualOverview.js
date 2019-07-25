// @flow
import React, { useEffect, useCallback } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { DownloadIcon } from "@casumo/cmp-icons";
import { formatCurrency } from "Utils";
import type { AnnualOverview } from "Models/transactionsBetsHistory";

type Content = {
  annual_transactions_list_heading: string,
  annual_transactions_starting_balance: string,
  annual_transactions_total_deposits: string,
  annual_transactions_total_withdrawals: string,
  annual_transactions_total_wagers: string,
  annual_transactions_total_wins: string,
  annual_transactions_total_bonus_awarded: string,
  annual_transactions_total_bonus_converted: string,
  annual_transactions_end_balance: string,
  annual_transactions_download_pdf: string,
};

type Props = {
  locale: string,
  t: Content,
  data: AnnualOverview,
  navigateToHistory: () => void,
};

type ListItemProps = {
  label: string,
  amount: number,
  currency: string,
  locale: string,
};

function ListItem({ label, amount, currency, locale }: ListItemProps) {
  const formatCurrencyBound = useCallback(
    value => formatCurrency({ locale, currency, value }),
    [locale, currency]
  );

  return (
    <Flex
      align="center"
      justify="space-between"
      className="u-padding-y"
      data-test-id="annual-overview-row"
    >
      <Flex.Item>
        <Text tag="div" size="sm">
          {label}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Text tag="div" size="md">
          {formatCurrencyBound(amount)}
        </Text>
      </Flex.Item>
    </Flex>
  );
}

export function TransactionsAnnualOverview({
  locale,
  t,
  data,
  navigateToHistory,
}: Props) {
  const passedProps = { currency: data.currency, locale };

  if (!data) {
    navigateToHistory();
    return null;
  }

  return (
    <div className="u-padding--md t-background-white">
      <Text tag="h3" size="md" className="u-margin-bottom--md">
        {t.annual_transactions_list_heading}
      </Text>
      <ListItem
        label={t.annual_transactions_starting_balance}
        amount={0}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_deposits}
        amount={data.depositsAmount}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_withdrawals}
        amount={data.withdrawalsAmount}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_wagers}
        amount={data.betsAmount}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_wins}
        amount={data.winningsAmount}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_bonus_awarded}
        amount={data.awardedBonusesAmount}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_bonus_converted}
        amount={data.convertedBonusesAmount}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_end_balance}
        amount={0}
        {...passedProps}
      />
      <Button className="u-margin-top--lg u-margin-bottom--md" disabled>
        <DownloadIcon />
        {t.annual_transactions_download_pdf}
      </Button>
    </div>
  );
}
