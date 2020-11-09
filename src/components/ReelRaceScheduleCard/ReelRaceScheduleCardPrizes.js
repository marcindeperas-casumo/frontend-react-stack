// @flow
import * as React from "react";
import cx from "classnames";
import { append, contains, reduce, ifElse, identity } from "ramda";
import { LaurelIcon, TournamentIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";

type Props = {
  formattedPrizes: Array<string>,
  t: ReelRacesContentPage,
};

export function ReelRaceScheduleCardPrizes({ formattedPrizes, t }: Props) {
  const prizes = reduce(
    // eslint-disable-next-line ramda/if-else-simplification
    (acc, v) => ifElse(contains(v), identity, append(v))(acc),
    []
  )(formattedPrizes);

  return (
    <Flex direction="vertical" className="u-padding-x--md">
      {prizes.map((prize, i) => {
        const count = i + 1;
        return (
          <Flex
            key={`${prize}_${count}`}
            className={cx(
              count !== prizes.length && "t-border-bottom",
              "t-border-grey-5 u-padding-y"
            )}
          >
            <Flex.Block>
              <div className="u-position-relative u-width--3xlg">
                <LaurelIcon
                  size="lg"
                  className={cx(
                    count === 1 && "t-color-yellow-30",
                    count === 2 && "t-color-grey-20",
                    count === 3 && "t-color-orange-30",
                    count >= 3 && "t-color-grey-5"
                  )}
                />
                <Text
                  size="sm"
                  className="u-position-absolute u-padding-y--md u-text-align-center u-width--3xlg o-inset-top--none u-font-weight-bold"
                >
                  {count === prizes.length && count !== formattedPrizes.length
                    ? `${count} - ${formattedPrizes.length}`
                    : count}
                </Text>
              </div>
            </Flex.Block>
            <Flex align="center">
              <TournamentIcon className="t-color-grey-50 u-margin-right" />
              <Text size="lg" className="u-font-weight-bold">
                {prize}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
