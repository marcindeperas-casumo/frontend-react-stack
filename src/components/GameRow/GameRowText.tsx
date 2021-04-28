import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import React from "react";
import classNames from "classnames";
import { renderBets, formatCurrency } from "Utils";
import DangerousHtml from "Components/DangerousHtml";
import * as A from "Types/apollo";

export const GameRowText = ({
  name,
  description,
  bets,
  jackpot,
  locale,
}: {
  name: string;
  description?: string;
  locale?: string | undefined;
  bets?: A.GameRow_GameFragment["lobby"]["bets"];
  jackpot?: A.Jackpots_GameFragment["jackpot"] | undefined;
}) => (
  <Flex direction="vertical" className="text-grey-90 u-width--full">
    <Text
      tag="span"
      size="sm"
      className={classNames("u-text-overflow--ellipsis u-margin-top", {
        "u-font-weight-bold": bets || description,
      })}
    >
      <DangerousHtml html={name} />
    </Text>
    {description && (
      <Text tag="span" className="text-grey-50 u-margin-top" size="sm">
        {description}
      </Text>
    )}
    <JackpotAmount {...jackpot} locale={locale} />
    <BetsLevels bets={renderBets(bets)} />
  </Flex>
);

function BetsLevels({ bets }) {
  if (bets) {
    return (
      <Text tag="span" size="sm" className="text-grey-50 u-margin-top">
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
      tag="span"
      size="sm"
      className="u-font-weight-bold text-red-30  u-margin-top"
    >
      {formatCurrency({ currency, locale, value: amount })}
    </Text>
  );
}
