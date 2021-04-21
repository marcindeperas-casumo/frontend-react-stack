import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import {
  TripleWinIcon,
  TripleBigWinIcon,
  MegaWinIcon,
} from "@casumo/cmp-icons";
import * as React from "react";

type Props = {
  boosters: {
    triples: number;
    bigWins: number;
    megaWins: number;
  };
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
      className="u-padding-x--md text-purple-60"
    >
      <Flex direction="vertical" align="center">
        <div className="text-teal-50 t-border t-border-current t-border-r--circle u-padding">
          <TripleWinIcon size="md" className="text-purple-60" />
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
        <div className="text-teal-50 t-border t-border-current t-border-r--circle u-padding">
          <TripleBigWinIcon size="md" className="text-purple-60" />
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
        <div className="text-teal-50 t-border t-border-current t-border-r--circle u-padding">
          <MegaWinIcon size="md" className="text-purple-60" />
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
