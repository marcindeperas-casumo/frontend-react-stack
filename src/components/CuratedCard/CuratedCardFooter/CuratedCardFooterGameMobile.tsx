import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlayIcon } from "@casumo/cmp-icons";
import React from "react";
import { convertHTMLToString } from "Utils";
import { GameThumb } from "Components/GameThumb";
import TrackClick from "Components/TrackClick";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { CURATED_TYPE, prefixCuratedSlug } from "Models/curated";
import type { CuratedCardFooterGameProps } from "./CuratedCardFooterGame";

export const CuratedCardFooterGameMobile = ({
  game,
  launchButtonText,
  onLaunchGame,
}: CuratedCardFooterGameProps) => {
  if (!game) {
    return null;
  }

  const trackClickGamePlayData = {
    [EVENT_PROPS.CURATED_TYPE]: CURATED_TYPE.GAME,
    [EVENT_PROPS.CURATED_SLUG]: prefixCuratedSlug(game?.slug),
  };

  return (
    <Flex align="center">
      <Flex.Item className="o-flex__item--no-shrink">
        <GameThumb src={game.backgroundImage} mark={game.logo} />
      </Flex.Item>
      <Flex.Block>
        <Text tag="span" size="sm" className="u-font-weight-bold text-white">
          {convertHTMLToString(game.name)}
        </Text>
      </Flex.Block>
      <Flex.Item>
        <Flex justify="center">
          <TrackClick
            eventName={EVENTS.MIXPANEL_CURATED_COMPONENT_CLICKED}
            data={trackClickGamePlayData}
          >
            <ButtonPrimary
              size="md"
              id="gtm-curated-play"
              onClick={onLaunchGame}
              className="u-pointer--initial u-padding-x--xlg@phablet u-padding-x--3xlg@tablet u-padding-x--3xlg@desktop"
            >
              <PlayIcon size="sm" />
              <span className="u-margin-left">{launchButtonText}</span>
            </ButtonPrimary>
          </TrackClick>
        </Flex>
      </Flex.Item>
    </Flex>
  );
};
