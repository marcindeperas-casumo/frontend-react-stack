// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import type { ReelRace, ReelRacesTranslations } from "Models/reelRaces";
import type { Playing } from "Models/playing";
import * as A from "Types/apollo";
import DangerousHtml from "Components/DangerousHtml";
import { interpolate } from "Utils";
import { GameThumb } from "Components/GameThumb";
import GrandReelRaceBadge from "Components/ReelRaceCard/GrandReelRaceBadge.svg";
import "./ReelRaceWidget.scss";

type Props = {
  launchGame: () => void,
  scheduledGame: A.GameRow_Game,
  gameSlug: string,
  playing: Playing,
  t: ReelRacesTranslations,
  reelRace: ReelRace,
};

export function ReelRaceWidgetHeader(props: Props) {
  const { t, scheduledGame, gameSlug, playing, reelRace } = props;

  if (playing.gameId === gameSlug) {
    if (!scheduledGame.name) {
      return null;
    }

    return (
      <Flex direction="vertical" justify="space-between">
        <Text
          size="xs"
          tag="div"
          className="u-text-transform-uppercase u-padding-x--md u-font-weight-black u-padding-top--md u-text-align-center t-color-plum"
        >
          {scheduledGame.name}
        </Text>
        <Text
          size="xs"
          tag="div"
          className="u-font-weight-bold u-text-align-center"
        >
          {interpolate(t.compete_for, {
            prize: reelRace.prize,
          })}
        </Text>
      </Flex>
    );
  } else {
    return (
      <Flex
        align="center"
        className="u-padding--md u-cursor-pointer u-position-relative"
        onClick={props.launchGame}
      >
        <GameThumb
          src={scheduledGame.logoBackground}
          alt={scheduledGame.name}
          mark={scheduledGame.logo}
        />
        {reelRace.promoted && (
          <GrandReelRaceBadge className="c-reel-race__badge" />
        )}
        <Flex direction="vertical" spacing="sm" className="u-margin-left--md">
          <Text tag="span" className="u-margin-bottom--sm u-font-weight-bold">
            {interpolate(t.compete_for, {
              prize: reelRace.prize,
            })}
          </Text>
          <Text tag="span" size="xs">
            <DangerousHtml html={scheduledGame.name} />
          </Text>
        </Flex>
      </Flex>
    );
  }
}
