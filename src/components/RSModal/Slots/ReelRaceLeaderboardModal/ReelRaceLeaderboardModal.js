// @flow
import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { TrophyIcon } from "@casumo/cmp-icons";
import { getOrdinalSuffix, interpolateWithJSX } from "Utils";
import { useLocale } from "Utils/hooks";
import { type GamePageRrLeaderboardInput } from "Models/modal";
import FeaturedImage from "./featuredImage.svg";

type Props = {
  acceptModal: () => void,
  config: {
    input?: GamePageRrLeaderboardInput,
  },
};

export function ReelRaceLeaderboardModal({ acceptModal, config }: Props) {
  const locale = useLocale();

  if (!config.input) {
    return null;
  }

  const { position, winnerName } = config.input;
  const placeSuffix = getOrdinalSuffix({ locale, amount: position });
  const youPlacedHigh = "Congratulations, you placed {{place}}!";
  const someoneWon = "{{winnerName}} won the race!";
  const featuredSubtitle = (
    <Text tag="div" size="lg">
      {position < 4
        ? interpolateWithJSX(
            {
              place: (
                <span className="t-color-teal-50">
                  {position}
                  {placeSuffix}
                </span>
              ),
            },
            youPlacedHigh
          )
        : interpolateWithJSX(
            {
              winnerName: <span className="t-color-teal-50">{winnerName}</span>,
            },
            someoneWon
          )}
    </Text>
  );
  const featuredTitle = (
    <Flex
      direction="vertical"
      align="center"
      className="u-text-align-center u-font-weight-bold u-padding-x--lg"
    >
      <TrophyIcon size="md" className="u-margin-bottom" />
      {featuredSubtitle}
    </Flex>
  );

  return (
    <CudlModal
      closeIcon={{ action: acceptModal }}
      featuredImage={<FeaturedImage />}
      featuredTitle={featuredTitle}
    >
      Leaderboard comes here.
    </CudlModal>
  );
}
