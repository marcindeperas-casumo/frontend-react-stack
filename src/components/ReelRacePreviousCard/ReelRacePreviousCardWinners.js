// @flow
import * as React from "react";
import cx from "classnames";
import { slice } from "ramda";
import { LaurelIcon, TournamentIcon } from "@casumo/cmp-icons";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as A from "Types/apollo";
import type { ReelRacesContentPage } from "Components/ReelRacesPage/ReelRacesPage";

type Props = {
  reelRace: A.ReelRacePreviousCard_ReelRace,
  t: ReelRacesContentPage,
};

export function ReelRacePreviousCardWinners({ reelRace, t }: Props) {
  const [full, setFull] = React.useState(false);
  const toggleFull = React.useCallback(() => setFull(state => !state), [
    setFull,
  ]);
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

  const renderRow = (p, i, length, showPrizes = false) => {
    return (
      <Flex
        key={`${p.playerName}`}
        className="t-border-bottom t-border-grey-0 u-padding-y"
      >
        <Flex className="o-flex--1">
          <div className="u-position-relative u-width--3xlg">
            <LaurelIcon
              size="lg"
              className={cx(
                p.position === 1 && "t-color-yellow-30",
                p.position === 2 && "t-color-grey-20",
                p.position === 3 && "t-color-orange-30",
                p.position >= 3 && "t-color-grey-5"
              )}
            />
            <Text
              size="sm"
              className="u-position-absolute u-padding-y--md u-text-align-center u-width--3xlg o-inset-top--none u-font-weight-bold"
            >
              {p.position}
            </Text>
          </div>
          <Text size="sm" className="u-padding-y--md u-margin-left">
            {p.playerName}
          </Text>
          <Text
            size="sm"
            className="u-padding-y--md u-margin-left u-font-weight-bold t-color-purple-50"
          >
            {p.points} pts.
          </Text>
        </Flex>
        {showPrizes && reelRace.formattedPrizes[i] && (
          <Flex align="center" className="u-margin-right--lg">
            <TournamentIcon className="t-color-grey-50 u-margin-right" />
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
      <Flex.Block className="u-text-align-center u-margin-bottom--lg">
        <ButtonPrimary size="md" onClick={toggleFull}>
          {full ? t?.hide_leaderboard_button : t?.show_leaderboard_button}
        </ButtonPrimary>
      </Flex.Block>
    </Flex>
  );
}
