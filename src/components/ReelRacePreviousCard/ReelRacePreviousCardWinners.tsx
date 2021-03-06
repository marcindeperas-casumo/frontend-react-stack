import { LaurelIcon, TournamentIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { slice } from "ramda";
import cx from "classnames";
import * as React from "react";
import * as A from "Types/apollo";
import { useIsScreenMinimumTablet } from "Utils/hooks";
import { interpolate } from "Utils/utils";
import type { TReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPageContainer";

type Props = {
  reelRace: A.ReelRacePreviousCard_ReelRaceFragment;
  t: TReelRacesContentPage;
  expanded: boolean;
};

export function ReelRacePreviousCardWinners({
  reelRace,
  t,
  expanded = false,
}: Props) {
  const isNotMobile = useIsScreenMinimumTablet();
  const [full, setFull] = React.useState<boolean>(expanded);
  const toggleFull = React.useCallback(
    () => setFull(state => !state),
    [setFull]
  );
  const winners = slice(
    0,
    reelRace.formattedPrizes.length,
    reelRace.leaderboard
  );
  const rest = slice(
    reelRace.formattedPrizes.length,
    Infinity,
    reelRace.leaderboard
  );

  const renderRow = (
    p: A.ReelRacePreviousCard_ReelRaceFragment["leaderboard"][number],
    i: number,
    length: number,
    showPrizes: boolean = false
  ) => {
    return (
      <Flex
        key={`${p.playerName}`}
        className="t-border-bottom border-grey-0 u-padding-y"
      >
        <Flex className="o-flex--1">
          <div className="o-position--relative u-width--3xlg">
            <LaurelIcon
              size="lg"
              className={cx(
                p.position === 1 && "text-yellow-30",
                p.position === 2 && "text-grey-20",
                p.position === 3 && "text-orange-30",
                p.position >= 3 && "text-grey-5"
              )}
            />
            <Text
              size="sm"
              className="o-position--absolute u-padding-y--md u-text-align-center u-width--3xlg o-inset-top--none u-font-weight-bold"
            >
              {p.position}
            </Text>
          </div>
          <Text size="sm" className="u-padding-y--md u-margin-left">
            {p.playerName}
          </Text>
          <Text
            size="sm"
            className="u-padding-y--md u-margin-left u-font-weight-bold text-purple-50"
          >
            {interpolate(t.points_template || "", {
              points: p.points,
            })}
          </Text>
        </Flex>
        {showPrizes && reelRace.formattedPrizes[i] && (
          <Flex
            align="center"
            className={cx(isNotMobile && "u-margin-right--lg")}
          >
            <TournamentIcon className="text-grey-50 u-margin-right" />
            <Text size="md" className="u-font-weight-bold">
              {reelRace.formattedPrizes[i]}
            </Text>
          </Flex>
        )}
      </Flex>
    );
  };

  return (
    <Flex direction="vertical" className="u-padding-x--md">
      {winners.map((p, i) => renderRow(p, i, winners.length, true))}
      {full && rest.map((p, i) => renderRow(p, i, rest.length))}
      {Boolean(rest.length) && (
        <Flex.Block className="u-text-align-center u-margin-bottom--lg">
          <ButtonPrimary size="md" onClick={toggleFull}>
            {full ? t?.hide_leaderboard_button : t?.show_leaderboard_button}
          </ButtonPrimary>
        </Flex.Block>
      )}
    </Flex>
  );
}
