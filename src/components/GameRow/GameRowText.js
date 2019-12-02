// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { renderBets, formatCurrency } from "Utils";
import DangerousHtml from "Components/DangerousHtml";
import type { Jackpot } from "Types/jackpot";
import type { JackpotsQuery_gamesList_games_lobby_bets } from "Types/apollo";

export const GameRowText = ({
  name,
  bets,
  jackpot,
  locale,
}: {
  name: string,
  locale: ?string,
  bets: ?JackpotsQuery_gamesList_games_lobby_bets,
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
    <JackpotAmount {...jackpot} locale={locale} />
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

function JackpotAmount({ value, locale }) {
  if (!value || !locale) {
    return null;
  }

  const { currency, amount } = value;

  return (
    <Text
      tag="div"
      size="sm"
      className="u-font-weight-bold t-color-red u-padding-bottom--sm"
    >
      {formatCurrency({ currency, locale, value: amount })}
    </Text>
  );
}
