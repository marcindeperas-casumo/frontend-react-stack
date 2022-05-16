import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import Flex from "@casumo/cmp-flex";
import { PlayIcon } from "@casumo/cmp-icons";
import React from "react";
import { GameThumb } from "Components/GameThumb";
import TrackClick from "Components/TrackClick";
import { convertHTMLToString } from "Utils";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { CURATED_TYPE, prefixCuratedSlug } from "Models/curated";
import type { CuratedCardFooterGameProps } from "./CuratedCardFooterGame";

export const CuratedCardFooterGameDesktop = ({
  game,
  launchButtonText,
  onLaunchGame,
}: CuratedCardFooterGameProps) => {
  const trackClickGamePlayData = {
    [EVENT_PROPS.CURATED_TYPE]: CURATED_TYPE.GAME,
    [EVENT_PROPS.CURATED_SLUG]: prefixCuratedSlug(game?.slug),
  };

  return (
    <div className="o-wrapper">
      <div className="u-width--2/3">
        <Flex align="center" spacing="md">
          <Flex.Item className="o-flex__item--no-shrink">
            <GameThumb
              width={64}
              height={64}
              src={game.backgroundImage}
              mark={game.logo}
            />
          </Flex.Item>
          <Flex.Block>
            <Text tag="span" className="u-font-weight-bold text-white">
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
                  className="u-pointer--initial u-padding-x--xlg@phablet u-padding-x--3xlg@tablet u-padding-x--3xlg@desktop u-padding-y--md@desktop"
                >
                  <PlayIcon />
                  <span className="u-margin-left">{launchButtonText}</span>
                </ButtonPrimary>
              </TrackClick>
            </Flex>
          </Flex.Item>
        </Flex>
      </div>
    </div>
  );
};
