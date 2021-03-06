import Flex from "@casumo/cmp-flex";
import { PlayIcon } from "@casumo/cmp-icons";
import { Button } from "@casumo/cmp-button";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import React, { ReactElement } from "react";
import { formatCurrency } from "Utils";
import GameTileImage from "Components/GameTile/GameTileImage";
import { GameTileInMaintenanceContainer as GameTileInMaintenance } from "Components/GameTile";
import TrackClick from "Components/TrackClick";
import { GameTileHeart } from "Components/GameTileHeart";
import { EVENTS, EVENT_PROPS } from "Src/constants";
import * as A from "Types/apollo";
import "./GameTile.scss";

export type GameTileTranslations = {
  play_button_text_game_tile: string;
};

export type Props = {
  className?: string;
  game: A.GameTile_GameFragment;
  imgixOpts?: Object;
  ratio?: string;
  t?: GameTileTranslations;
  tileJackpotMark?: ReactElement;
  locale?: string;
  gameLauncher?: Function;
};

export const DEFAULT_CLASSES =
  "o-ratio text-white t-border-r--md bg-grey-5 u-overflow--hidden";

export const GameTile = ({
  className,
  game,
  imgixOpts = {
    w: 170,
    q: 70,
  },
  ratio = "game-tile",
  t = { play_button_text_game_tile: "Play" },
  tileJackpotMark = null,
  locale,
  gameLauncher,
}: Props) => {
  const { isInMaintenance, backgroundImage, logo, name, id, jackpot } =
    game || {};
  const JackpotAmountButton = () => {
    const currency = jackpot?.value?.currency;
    const currentLocale = locale;
    const amount = jackpot?.value?.amount;

    if (!jackpot) {
      return null;
    }

    return (
      <div className="c-game-tile-container__jackpot o-position--absolute o-inset-x--none bg-grey-90 u-text-align-center t-border-r--md text-white bg-opacity-75 u-font-sm u-font-weight-bold u-margin-left u-margin-right u-margin-top--lg u-height--lg">
        <span>
          {formatCurrency({
            locale: currentLocale || "en-en",
            currency: currency || "EUR",
            value: amount,
          })}
        </span>
      </div>
    );
  };

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

  return (
    <TrackClick
      eventName={EVENTS.MIXPANEL_GAME_LAUNCH}
      data={{ [EVENT_PROPS.GAME_NAME]: name }}
    >
      <Flex
        className={classNames(
          DEFAULT_CLASSES,
          "u-cursor--pointer",
          `o-ratio--${ratio}`,
          "c-game-tile-top-wrapper",
          "o-position--relative",
          className
        )}
        onClick={gameLauncher}
      >
        <GameTileImage
          logoBackground={backgroundImage}
          logo={logo}
          name={name}
          imgixOpts={imgixOpts}
        />
        {tileJackpotMark}
        {jackpot && <JackpotAmountButton />}
        <div className="o-ratio__content c-game-tile-container before:rounded-2xl cursor-pointer absolute z-content-overlay">
          <Flex
            direction="horizontal"
            justify="center"
            align="center"
            className="c-game-tile-container__play-button u-width--full u-display--none o-position--absolute u-zindex--content-overlay"
          >
            <Button
              size="sm"
              className="u-width--3/4 bg-white hover:bg-white text-purple-60"
              data-test="game-list-tile-launch-link"
            >
              <div className="flex ml">
                <Text className="u-font u-font-weight-bold u-margin-right u-position--relative c-game-tile-container__button-text">
                  {t?.play_button_text_game_tile}
                </Text>
                <PlayIcon size="default" />
              </div>
            </Button>
          </Flex>
          <Flex
            justify="end"
            align="end"
            className="u-width--full c-game-tile-container__bottom-bar o-position--absolute o-inset-bottom--none"
          >
            <GameTileHeart gameId={id} gameName={name} />
          </Flex>
        </div>
      </Flex>
    </TrackClick>
  );
};
