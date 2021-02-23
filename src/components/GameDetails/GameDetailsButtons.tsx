// @flow
import React from "react";
import { PlayIcon } from "@casumo/cmp-icons";
import { ButtonPrimary, ButtonSecondary } from "@casumo/cmp-button";
import { launchGame } from "Services/LaunchGameService";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { isDesktop } from "Components/ResponsiveLayout";
import TrackClick from "Components/TrackClick";

type Props = {
  slug: string,
  name: string,
  playButtonText: ?string,
  hasPlayForFun: boolean,
  practiceButtonText: ?string,
};

const size = isDesktop() ? "lg" : "sm";
export const GameDetailsButtons = ({
  slug,
  name,
  playButtonText,
  hasPlayForFun,
  practiceButtonText,
}: Props) => (
  <div className="u-zindex--content-overlay u-position-fixed@mobile u-bottom-0 u-left-shell-offset u-right-0 t-background-white u-padding--md u-width--full@tablet u-width--2/3@desktop u-margin-x--auto">
    <TrackClick
      eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
      data={{
        [EVENT_PROPS.GAME_NAME]: name,
        [EVENT_PROPS.GAME_PLAY_TYPE]: "money",
      }}
    >
      <ButtonPrimary
        size={size}
        className="u-width--full u-margin-bottom--md"
        onClick={() => launchGame({ slug })}
      >
        {!isDesktop() && <PlayIcon size="sm" className="u-margin-right--sm" />}
        <span>{playButtonText}</span>
      </ButtonPrimary>
    </TrackClick>
    {hasPlayForFun && (
      <TrackClick
        eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
        data={{
          [EVENT_PROPS.GAME_NAME]: name,
          [EVENT_PROPS.GAME_PLAY_TYPE]: "free",
        }}
      >
        <ButtonSecondary
          size={size}
          className="u-width--full"
          onClick={() =>
            launchGame({
              slug,
              playForFun: true,
            })
          }
        >
          {practiceButtonText || ""}
        </ButtonSecondary>
      </TrackClick>
    )}
  </div>
);
