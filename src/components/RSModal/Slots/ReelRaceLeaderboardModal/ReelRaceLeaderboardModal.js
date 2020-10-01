// @flow
import * as React from "react";
import CudlModal from "@casumo/cmp-modal";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { TrophyIcon } from "@casumo/cmp-icons";
import { getOrdinalSuffix, interpolateWithJSX } from "Utils";
import { useLocale } from "Utils/hooks";
import FeaturedImage from "./featuredImage.svg";

type Props = {
  acceptModal: () => void,
  place: number,
  winnerName?: string,
};

export function ReelRaceLeaderboardModal({
  acceptModal,
  place,
  winnerName,
}: Props) {
  const locale = useLocale();
  const placeSuffix = getOrdinalSuffix({ locale, amount: place });
  const youPlacedHigh = "Congratulations, you placed {{place}}!";
  const someoneWon = "{{winnerName}} won the race!";
  const featuredSubtitle = (
    <Text size="lg">
      {place < 4
        ? interpolateWithJSX(
            {
              place: (
                <span className="t-color-teal-50">
                  {place}
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
