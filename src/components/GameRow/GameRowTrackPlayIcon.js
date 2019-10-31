// @flow
import React from "react";
import Flex from "@casumo/cmp-flex";
import { PlayIcon } from "@casumo/cmp-icons";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import TrackClick from "Components/TrackClick";

export const GameRowTrackPlayIcon = ({
  name,
  onLaunchGame,
}: {
  name: string,
  onLaunchGame: () => void,
}) => (
  <TrackClick
    eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
    data={{ [EVENT_PROPS.GAME_NAME]: name }}
  >
    <Flex.Item className="o-flex__item--no-shrink" onClick={onLaunchGame}>
      <PlayIcon className="t-background-chrome-light-1 t-color-chrome-dark-2 t-border-r--circle u-padding" />
    </Flex.Item>
  </TrackClick>
);
