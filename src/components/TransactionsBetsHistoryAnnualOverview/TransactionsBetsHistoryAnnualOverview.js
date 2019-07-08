// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";

type Content = {
  [string]: string,
};

type Props = {
  content: Content,
};

type ListItemProps = {
  label: string,
  amount: number,
};

function ListItem({ label, amount }: ListItemProps) {
  return (
    <Flex align="center" justify="space-between" className="u-padding-y--sm">
      <Flex.Item>
        <Text tag="dt" size="sm">
          {label}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Text tag="dd" size="md">
          {amount}
        </Text>
      </Flex.Item>
    </Flex>
  );
}

export function TransactionsBetsHistoryAnnualOverview({ content }: Props) {
  return (
    <div className="u-padding-y--md u-padding-x--sm t-background-white">
      <Text tag="h3" size="md" className="u-margin-bottom--md">
        {content.annual_transactions_list_heading}
      </Text>
      <ListItem
        label={content.annual_transactions_starting_balance}
        amount={44}
      />
      <ListItem
        label={content.annual_transactions_total_deposits}
        amount={44}
      />
      <ListItem
        label={content.annual_transactions_total_withdrawals}
        amount={44}
      />
      <ListItem label={content.annual_transactions_total_wagers} amount={44} />
      <ListItem label={content.annual_transactions_total_wins} amount={44} />
      <ListItem
        label={content.annual_transactions_total_bonus_awarded}
        amount={44}
      />
      <ListItem
        label={content.annual_transactions_total_bonus_converted}
        amount={44}
      />
      <ListItem label={content.annual_transactions_end_balance} amount={44} />
    </div>
  );
}
