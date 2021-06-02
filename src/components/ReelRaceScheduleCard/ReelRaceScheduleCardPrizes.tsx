import { LaurelIcon, TournamentIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import cx from "classnames";
import * as R from "ramda";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";
import { useIsScreenMinimumTablet } from "Utils/hooks";

type Props = {
  formattedPrizes: Array<string>;
  t: TReelRacesContentPage;
};

export function ReelRaceScheduleCardPrizes({ formattedPrizes, t }: Props) {
  const isNotMobile = useIsScreenMinimumTablet();
  const prizes = R.reduce(
    (acc, v) => R.unless(R.contains(v), R.append(v), acc),
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
              "border-grey-0 u-padding-y",
              "o-flex--1"
            )}
          >
            <Flex className="o-flex--1">
              <Flex.Item className="o-position--relative u-width--3xlg">
                <LaurelIcon
                  size="lg"
                  className={cx(
                    count === 1 && "text-yellow-30",
                    count === 2 && "text-grey-20",
                    count === 3 && "text-orange-30",
                    count >= 3 && "text-grey-5"
                  )}
                />
                <Text
                  size="sm"
                  className="o-position--absolute u-padding-y--md u-text-align-center u-width--3xlg o-inset-top--none u-font-weight-bold"
                >
                  {position}
                </Text>
              </Flex.Item>
              <Flex
                align="center"
                direction="horizontal"
                className={cx(
                  "u-margin-left",
                  isNotMobile && "u-margin-right o-flex--1"
                )}
              >
                <Flex align="center">
                  <TournamentIcon className="text-grey-50 u-margin-right" />
                  <Text className="u-font u-font-weight-bold">{prize}</Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
}
