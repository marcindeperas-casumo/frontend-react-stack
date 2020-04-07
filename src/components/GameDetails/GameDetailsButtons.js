// @flow
import React from "react";
import { PlayIcon } from "@casumo/cmp-icons";
import Button from "@casumo/cmp-button";
import { launchGame } from "Services/LaunchGameService";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import TrackClick from "Components/TrackClick";

type Props = {
  slug: string,
  name: string,
  playButtonText: string,
  hasPlayForFun: boolean,
  practiceButtonText: string,
};

export const GameDetailsButtons = ({
  slug,
  name,
  playButtonText,
  hasPlayForFun,
  practiceButtonText,
}: Props) => (
  <div className="u-zindex--content-overlay u-position-fixed@mobile u-bottom-0 u-left-shell-offset u-right-0 t-background-white u-padding--md">
    <TrackClick
      eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
      data={{
        [EVENT_PROPS.GAME_NAME]: name,
        [EVENT_PROPS.GAME_PLAY_TYPE]: "money",
      }}
    >
      <Button
        className="u-width--full u-margin-bottom--md"
        variant="primary"
        onClick={() => launchGame({ slug })}
      >
        <PlayIcon size="sm" className="u-margin-right--sm" />
        <span>{playButtonText}</span>
      </Button>
    </TrackClick>
    {hasPlayForFun && (
      <TrackClick
        eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
        data={{
          [EVENT_PROPS.GAME_NAME]: name,
          [EVENT_PROPS.GAME_PLAY_TYPE]: "free",
        }}
      >
        <Button
          className="u-width--full"
          variant="secondary"
          onClick={() =>
            launchGame({
              slug,
              playForFun: true,
            })
          }
        >
          {practiceButtonText}
        </Button>
      </TrackClick>
    )}
  </div>
);
