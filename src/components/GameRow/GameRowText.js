// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { renderBets } from "Utils";
import DangerousHtml from "Components/DangerousHtml";
import type { Jackpot } from "Types/jackpot";

export const GameRowText = ({
  name,
  bets,
  jackpot,
}: {
  name: string,
  bets: Object,
  jackpot: ?Jackpot,
}) => (
  <Flex.Block className="t-color-grey-dark-3 u-padding-left--sm">
    <Text
      tag="div"
      size="sm"
      className={classNames({ "u-font-weight-bold": bets })}
    >
      <DangerousHtml html={name} />
    </Text>
    <JackpotAmount {...jackpot} />
    <BetsLevels bets={renderBets(bets)} />
  </Flex.Block>
);

function BetsLevels({ bets }) {
  if (bets) {
    return (
      <Text tag="div" size="sm" className="u-padding-top--sm t-color-grey">
        {bets}
      </Text>
    );
  }

  return null;
}

function JackpotAmount({ value }) {
  if (!value) {
    return null;
  }

  const { currency, amount } = value;
  const formattedAmount = new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency,
  }).format(amount);

  return (
    <Text
      tag="div"
      size="sm"
      className="u-font-weight-bold t-color-red u-padding-bottom--sm"
    >
      {formattedAmount}
    </Text>
  );
}
