import Flex from "@casumo/cmp-flex";
import { MoreIcon, PlayIcon } from "@casumo/cmp-icons";
import { Button } from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import { Link } from "@reach/router";
import React from "react";
import { Mobile, TabletAndDesktop } from "Components/ResponsiveLayout";
import GameTileImage from "Components/GameTile/GameTileImage";
import { GameTileInMaintenanceContainer as GameTileInMaintenance } from "Components/GameTile";
import { launchGame } from "Services/LaunchGameService";
import TrackClick from "Components/TrackClick";
import { GameTileHeart } from "Components/GameTileHeart";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import * as A from "Types/apollo";
import { LiveCasinoCardSmallContainer } from "Components/LiveCasinoCard/LiveCasinoCardSmallContainer";
import "./GameTile.scss";

export type GameTileTranslations = {
  play_button_text_game_tile: string;
};

export type Props = {
  className?: string;
  game: A.GameTile_GameFragment;
  imgixOpts?: Object;
  ratio?: string;
  t: GameTileTranslations;
};

export const DEFAULT_CLASSES =
  "o-ratio t-color-white t-border-r--md t-background-grey-5 u-overflow--hidden";

export const GameTile = ({
  className,
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{}' is not assignable to type 'GameTile_Game... Remove this comment to see the full error message
  game = {},
  imgixOpts = {
    w: 170,
    q: 70,
  },
  ratio = "game-tile",
  t = { play_button_text_game_tile: "Play" },
}: Props) => {
  const {
    isInMaintenance,
    backgroundImage,
    logo,
    name,
    slug,
    id,
    liveCasinoId,
  } = game;

  if (isInMaintenance) {
    return (
      <GameTileInMaintenance
        ratio={ratio}
        className={className}
        game={game}
        imgixOpts={imgixOpts}
      />
    );
  }

  if (liveCasinoId) {
    return <LiveCasinoCardSmallContainer game={game} />;
  }

  return (
    <TrackClick
      eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
      data={{ [EVENT_PROPS.GAME_NAME]: name }}
    >
      <Flex
        className={classNames(
          DEFAULT_CLASSES,
          "u-cursor-pointer",
          `o-ratio--${ratio}`,
          className
        )}
        onClick={() => launchGame({ slug: game.slug })}
      >
        <GameTileImage
          logoBackground={backgroundImage}
          logo={logo}
          name={name}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ logoBackground: string; logo: string; name... Remove this comment to see the full error message
          imgixOpts={imgixOpts}
        />
        <div className="o-ratio__content c-game-tile-container u-cursor--pointer o-position--absolute u-zindex--content-overlay">
          <Flex
            direction="horizontal"
            justify="center"
            align="center"
            className="c-game-tile-container__play-button u-width--full u-display--none o-position--absolute u-zindex--content-overlay"
          >
            <Button
              size="sm"
              className="u-width--3/4 t-background-white t-background-white:hover t-color-purple-60"
              data-test="game-list-tile-launch-link"
            >
              <div className="u-display--flex">
                <Text className="u-font u-font-weight-bold u-margin-right u-position--relative c-game-tile-container__button-text">
                  {t?.play_button_text_game_tile}
                </Text>
                <PlayIcon size="default" />
              </div>
            </Button>
          </Flex>
          <Flex
            justify="space-between"
            align="end"
            className="u-width--full c-game-tile-container__bottom-bar o-position--absolute o-inset-bottom--none"
          >
            <Flex.Item onClick={e => e.stopPropagation()}>
              {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
              <TrackClick
                eventName={EVENTS.MIXPANEL_GAME_DETAILS}
                data={{ [EVENT_PROPS.GAME_NAME]: name }}
              >
                <Mobile>
                  <a
                    className="u-padding u-display--block"
                    href={`/play/${slug}`}
                  >
                    <MoreIcon className="t-color-white" />
                  </a>
                </Mobile>
                <TabletAndDesktop>
                  <Link
                    to={`/games/details/${slug}`}
                    className="u-padding u-display--block"
                  >
                    <MoreIcon className="t-color-white" />
                  </Link>
                </TabletAndDesktop>
              </TrackClick>
            </Flex.Item>
            <GameTileHeart gameId={id} gameName={name} />
          </Flex>
        </div>
      </Flex>
    </TrackClick>
  );
};
