// @flow
import * as React from "react";
import * as R from "ramda";
import CudlModal from "@casumo/cmp-modal";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { TournamentIcon } from "@casumo/cmp-icons";
import { getOrdinalSuffix, interpolateWithJSX } from "Utils";
import { useLocale, useTranslationsGql } from "Utils/hooks";
import { type GamePageRrLeaderboardInput } from "Models/modal";
import {
  ReelRaceLeaderboardResults,
  ReelRaceLeaderboardListEntry,
} from "Components/ReelRaceLeaderboard";
import FeaturedImage from "./featuredImage.svg";

type Props = {
  acceptModal: () => void,
  config: {
    input?: GamePageRrLeaderboardInput,
  },
};

const cmsPrefix = "root:iframe-solution:fields";
const LEADERBOARD_SIZE = 20;

export function ReelRaceLeaderboardModal({ acceptModal, config }: Props) {
  const locale = useLocale();
  const { t, loading: tLoading } = useTranslationsGql({
    playerPlacedHigh: `${cmsPrefix}.rr_leaderboard_modal_title_player_placed_high`,
    someoneWon: `${cmsPrefix}.rr_leaderboard_modal_title_someone_won`,
  });

  if (!config.input || tLoading) {
    return null;
  }

  const {
    position,
    points,
    prizes,
    leaderboard,
    playerId,
    playerName,
  } = config.input;
  const winnerName = R.prop("playerName", R.head(leaderboard));
  const playerInTop3 = position < 4;
  const playerOutsideLeaderboard = position > LEADERBOARD_SIZE;
  const placeSuffix = getOrdinalSuffix({ locale, amount: position });
  const featuredSubtitle = (
    <Text tag="div" size="lg">
      {playerInTop3
        ? interpolateWithJSX(
            {
              place: (
                <span className="t-color-teal-50">
                  {position}
                  {placeSuffix}
                </span>
              ),
            },
            t.playerPlacedHigh
          )
        : interpolateWithJSX(
            {
              winnerName: <span className="t-color-teal-50">{winnerName}</span>,
            },
            t.someoneWon
          )}
    </Text>
  );
  const featuredTitle = (
    <Flex
      direction="vertical"
      align="center"
      className="u-text-align-center u-font-weight-bold u-padding-x--lg"
    >
      <TournamentIcon size="md" className="u-margin-bottom" />
      {featuredSubtitle}
    </Flex>
  );

  return (
    <CudlModal
      closeIcon={{ action: acceptModal }}
      featuredImage={<FeaturedImage />}
      featuredTitle={featuredTitle}
    >
      <ReelRaceLeaderboardResults
        leaderboard={leaderboard}
        size={LEADERBOARD_SIZE}
        prizes={prizes}
        playerId={playerId}
      />
      {playerOutsideLeaderboard && (
        <ReelRaceLeaderboardListEntry
          points={points}
          position={position}
          text={playerName}
          highlighted
          stuckToBottom
        />
      )}
    </CudlModal>
  );
}
