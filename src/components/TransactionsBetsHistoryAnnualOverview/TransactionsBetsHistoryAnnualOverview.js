// @flow
import React, { useEffect, useCallback } from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";
import { DownloadIcon } from "@casumo/cmp-icons";
import { formatCurrency } from "Utils";
import type { AnnualOverview } from "Models/transactionsBetsHistory";

type Content = {
  [string]: string,
};

type Props = {
  locale: string,
  currency: string,
  content: Content,
  data: AnnualOverview,
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
    <Flex align="center" justify="space-between" className="u-padding-y">
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

export function TransactionsBetsHistoryAnnualOverview({
  locale,
  currency,
  content,
  data,
}: Props) {
  const passedProps = { currency, locale };

  return (
    <div className="u-padding-y--md u-padding-x--sm t-background-white">
      <Text tag="h3" size="md" className="u-margin-bottom--md">
        {content.annual_transactions_list_heading}
      </Text>
      <ListItem
        label={content.annual_transactions_starting_balance}
        amount={0}
        {...passedProps}
      />
      <ListItem
        label={content.annual_transactions_total_deposits}
        amount={data.depositsAmount}
        {...passedProps}
      />
      <ListItem
        label={content.annual_transactions_total_withdrawals}
        amount={data.withdrawalsAmount}
        {...passedProps}
      />
      <ListItem
        label={content.annual_transactions_total_wagers}
        amount={0}
        {...passedProps}
      />
      <ListItem
        label={content.annual_transactions_total_wins}
        amount={data.winningsAmount}
        {...passedProps}
      />
      <ListItem
        label={content.annual_transactions_total_bonus_awarded}
        amount={data.bonusesAmount}
        {...passedProps}
      />
      <ListItem
        label={content.annual_transactions_total_bonus_converted}
        amount={0}
        {...passedProps}
      />
      <ListItem
        label={content.annual_transactions_end_balance}
        amount={0}
        {...passedProps}
      />
      <Button className="u-margin-top--lg u-margin-bottom--md" disabled>
        <DownloadIcon />
        {content.annual_transactions_download_pdf}
      </Button>
    </div>
  );
}
