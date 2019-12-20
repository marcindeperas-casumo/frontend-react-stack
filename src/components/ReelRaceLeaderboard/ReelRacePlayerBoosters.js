// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { TripleWinIcon, TripleBigWinIcon, MegaIcon } from "@casumo/cmp-icons";

type Props = {
  boosters: {
    triples: number,
    bigWins: number,
    megaWins: number,
  },
};

export function ReelRacePlayerBoosters(props: Props) {
  const { boosters } = props;

  if (!boosters) {
    return null;
  }

  return (
    <Flex
      direction="horizontal"
      justify="space-between"
      className="u-padding-x--md t-color-plum"
    >
      <Flex direction="vertical" align="center">
        <div className="t-color-turquoise t-border t-border--current-color t-border-r--circle u-padding">
          <TripleWinIcon size="md" className="t-color-plum" />
        </div>
        <Text
          tag="div"
          size="xs"
          className="c-reel-race-leaderboard-widget__boosters u-font-weight-bold u-padding-y--sm"
        >
          {boosters.triples}
        </Text>
      </Flex>
      <Flex direction="vertical" align="center">
        <div className="t-color-turquoise t-border t-border--current-color t-border-r--circle u-padding">
          <TripleBigWinIcon size="md" className="t-color-plum" />
        </div>
        <Text
          tag="div"
          size="xs"
          className="c-reel-race-leaderboard-widget__boosters u-font-weight-bold u-padding-y--sm"
        >
          {boosters.bigWins}
        </Text>
      </Flex>
      <Flex direction="vertical" align="center">
        <div className="t-color-turquoise t-border t-border--current-color t-border-r--circle u-padding">
          <MegaIcon size="md" className="t-color-plum" />
        </div>
        <Text
          tag="div"
          size="xs"
          className="c-reel-race-leaderboard-widget__boosters u-font-weight-bold u-padding-y--sm"
        >
          {boosters.megaWins}
        </Text>
      </Flex>
    </Flex>
  );
}
