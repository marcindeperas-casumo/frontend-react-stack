import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { formatCurrency } from "Utils";
import type { AnnualOverviewType } from "Models/transactionsBetsHistory";
import { TCurrencyCode } from "Src/constants";
type Content = {
  annual_transactions_list_heading: string;
  annual_transactions_starting_balance: string;
  annual_transactions_total_deposits: string;
  annual_transactions_total_withdrawals: string;
  annual_transactions_total_wagers: string;
  annual_transactions_total_wins: string;
  annual_transactions_total_bonus_awarded: string;
  annual_transactions_total_bonus_converted: string;
  annual_transactions_end_balance: string;
  annual_transactions_download_pdf: string;
};

type Props = {
  selectedYear: string;
  locale: string;
  t: Content;
  data?: AnnualOverviewType;
  navigateToHistory: () => void;
  PdfButton: React.Component<any>;
};

type ListItemProps = {
  label: string;
  amount: number;
  currency: TCurrencyCode;
  locale: string;
};
const { useCallback } = React;
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
  selectedYear,
  PdfButton,
}: Props) {
  React.useEffect(() => {
    if (!data) {
      navigateToHistory();
    }
  }, [data, navigateToHistory]);
  if (!data) {
    return null;
  }
  const passedProps = { currency: data.currency, locale };
  return (
    <div className="u-padding--md t-background-white">
      <Text tag="h3" size="md" className="u-margin-bottom--md">
        {t.annual_transactions_list_heading}
      </Text>
      <ListItem
        label={t.annual_transactions_starting_balance}
        amount={data.startingBalance.real}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_deposits}
        amount={data.deposits}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_withdrawals}
        amount={data.withdrawals}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_wagers}
        amount={data.bets.real}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_wins}
        amount={data.wins.real}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_bonus_awarded}
        amount={data.bonus.awarded}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_total_bonus_converted}
        amount={data.bonus.converted}
        {...passedProps}
      />
      <ListItem
        label={t.annual_transactions_end_balance}
        amount={data.endingBalance.real}
        {...passedProps}
      />
      {/* @ts-expect-error ts-migrate(2604) FIXME: JSX element type 'PdfButton' does not have any con... Remove this comment to see the full error message */}
      <PdfButton
        year={Number.parseInt(selectedYear, 10)}
        label={t.annual_transactions_download_pdf}
      />
    </div>
  );
}
