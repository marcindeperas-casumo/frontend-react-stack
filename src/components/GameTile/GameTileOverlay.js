// @flow
import classNames from "classnames";
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { MoreIcon } from "@casumo/cmp-icons";
import { GameTileHeart } from "Components/GameTileHeart";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import { convertHTMLToString } from "Utils";
import PlayAction from "Components/GameTile/PlayAction";
import TemporaryUnavailable from "Components/GameTile/TemporaryUnavailable";
import TrackClick from "Components/TrackClick";

type Props = {
  name: string,
  slug: string,
  inMaintenanceMode: boolean,
  onLaunchGame: Function,
  onFavouriteGame: Function,
  alwaysActive: boolean,
  isInMyList: boolean,
  className?: string,
};

export const IN_MAINTENANCE_CLASS_NAME = "c-game-tile__overlay--maintenance";
export const DEFAULT_CLASS_NAME = "c-game-tile__overlay--default";
export const ALWAYS_ACTIVE_CLASS_NAME = "c-game-tile__overlay--active";

export const getClassModifier = (
  inMaintenanceMode: boolean,
  alwaysActive: boolean
) => {
  if (inMaintenanceMode) {
    return IN_MAINTENANCE_CLASS_NAME;
  }

  if (alwaysActive) {
    return ALWAYS_ACTIVE_CLASS_NAME;
  }

  return DEFAULT_CLASS_NAME;
};

const GameTileOverlay = ({
  name,
  slug,
  inMaintenanceMode,
  onLaunchGame,
  onFavouriteGame,
  alwaysActive,
  isInMyList,
  className,
}: Props) => {
  return (
    <div className={className}>
      <Flex
        align="center"
        justify={"space-between"}
        direction="vertical"
        className={classNames(
          "c-game-tile__overlay o-ratio__content u-text-align-center",
          getClassModifier(inMaintenanceMode, alwaysActive),
          "u-padding--md t-border-r"
        )}
        data-test-id="gameTileOverlay"
      >
        <Text
          size="sm"
          tag="span"
          className={classNames(
            alwaysActive && "u-visibility--hidden",
            "t-color-white u-text-clamp u-font-weight-bold u-padding-top"
          )}
        >
          {convertHTMLToString(name)}
        </Text>

        {inMaintenanceMode ? (
          <TemporaryUnavailable />
        ) : (
          <TrackClick
            eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
            data={{ [EVENT_PROPS.GAME_NAME]: name }}
          >
            <PlayAction onLaunchGame={onLaunchGame} />
          </TrackClick>
        )}
        <Flex
          justify={alwaysActive ? "end" : "space-between"}
          align="center"
          className="u-width--full"
        >
          {!alwaysActive && (
            <TrackClick
              eventName={EVENTS.MIXPANEL_GAME_DETAILS}
              data={{ [EVENT_PROPS.GAME_NAME]: name }}
            >
              <a
                href={`/en/play/${slug}`}
                onMouseDown={e => e.preventDefault()}
              >
                <MoreIcon className="t-color-white" />
              </a>
            </TrackClick>
          )}
          <div className="u-width--lg u-height--lg">
            <GameTileHeart onClick={onFavouriteGame} isActive={isInMyList} />
          </div>
        </Flex>
      </Flex>
    </div>
  );
};

export default GameTileOverlay;
