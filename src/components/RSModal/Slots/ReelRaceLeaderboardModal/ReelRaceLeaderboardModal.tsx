import CudlModal from "@casumo/cmp-modal";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { TournamentIcon } from "@casumo/cmp-icons";
import * as R from "ramda";
import * as React from "react";
import { getOrdinalSuffix, interpolateWithJSX } from "Utils";
import { useLocale, useTranslationsGql } from "Utils/hooks";
import type { ModalContentComponent } from "Components/RSModal/rsmodal.mappings";
import {
  ReelRaceLeaderboardResults,
  ReelRaceLeaderboardListEntry,
} from "Components/ReelRaceLeaderboard";
import FeaturedImage from "./featuredImage.svg";

const cmsPrefix = "root:iframe-solution:fields";
const LEADERBOARD_SIZE = 20;

export function ReelRaceLeaderboardModal({
  acceptModal,
  config,
}: ModalContentComponent<{}>) {
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
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ leaderboard: any; size: number; prizes: an... Remove this comment to see the full error message
        leaderboard={leaderboard}
        size={LEADERBOARD_SIZE}
        prizes={prizes}
        playerId={playerId}
        showSpins={false}
      />
      {playerOutsideLeaderboard && (
        <ReelRaceLeaderboardListEntry
          className="o-position--sticky o-inset-bottom--none"
          points={points}
          position={position}
          text={playerName}
          highlighted
          showSpins={false}
        />
      )}
    </CudlModal>
  );
}
