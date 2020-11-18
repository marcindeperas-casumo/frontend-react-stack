// @flow
import * as React from "react";
import cx from "classnames";
import { append, contains, reduce, ifElse, identity } from "ramda";
import { LaurelIcon, TournamentIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPage";
import { useIsScreenMinimumTablet } from "Utils/hooks";

type Props = {
  formattedPrizes: Array<string>,
  t: ReelRacesContentPage,
};

export function ReelRaceScheduleCardPrizes({ formattedPrizes, t }: Props) {
  const isNotMobile = useIsScreenMinimumTablet();
  const prizes = reduce(
    // eslint-disable-next-line ramda/if-else-simplification
    (acc, v) => ifElse(contains(v), identity, append(v))(acc),
    []
  )(formattedPrizes);

  return (
    <Flex direction="vertical" className="u-padding-x--md">
      {prizes.map((prize, i) => {
        const count = i + 1;
        const position =
          count === prizes.length && count !== formattedPrizes.length
            ? `${count} - ${formattedPrizes.length}`
            : count;

        return (
          <Flex
            key={`${prize}_${count}`}
            className={cx(
              count !== prizes.length && "t-border-bottom",
              "t-border-grey-0 u-padding-y"
            )}
          >
            <Flex className="o-flex--1">
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
                  {position}
                </Text>
              </div>
              <Flex align="center" className="u-margin-left">
                {t?.leaderboard_rank} #{position}
              </Flex>
            </Flex>
            <Flex
              align="center"
              className={cx(isNotMobile && "u-margin-right")}
            >
              <TournamentIcon className="t-color-grey-50 u-margin-right" />
              <Text size="md" className="u-font-weight-bold">
                {prize}
              </Text>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
