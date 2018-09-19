import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import ScrollingContainer from "@casumo/cmp-scrollable";
import classNames from "classnames";

import { KO_APP_EVENT_LAUNCH_GAME } from "../../constants";
import legacyBridge from "../../legacyBridge";

import GameListSkeleton from "./GameListSkeleton";
import GameTile from "../GameTile";
import LiveCasinoCard from "../LiveCasinoCard";
import Matcher from "../Matcher";

const emitLaunchGame = slug => {
  legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });
};

const renderLiveCasinoCards = ({ games }) =>
  games.map(game => (
    <Flex.Item className="o-flex__item-fixed-size o-flex" key={game.slug}>
      <LiveCasinoCard {...game} launchGame={() => emitLaunchGame(game.slug)} />
    </Flex.Item>
  ));

const renderTiles = ({ games }) =>
  games.map(game => (
    <Flex.Item
      className="o-flex__item-fixed-size o-flex c-top-game"
      key={game.slug}
    >
      <GameTile {...game} launchGame={() => emitLaunchGame(game.slug)} />
    </Flex.Item>
  ));

const renderExclusiveTiles = ({ games }) =>
  games.map(game => (
    <Flex.Item
      className="o-flex__item-fixed-size o-flex c-exclusive-game"
      key={game.slug}
    >
      <GameTile
        {...game}
        ratio="game-tile-exclusive"
        imgixOpts={{
          w: 188,
          h: 280,
          fit: "crop",
        }}
        launchGame={() => emitLaunchGame(game.slug)}
      />
    </Flex.Item>
  ));

const CardsOrTiles = props => (
  <Matcher
    getKey={({ display }) => display}
    matchers={{
      tiles: renderTiles,
      liveCasinoCards: renderLiveCasinoCards,
      exclusiveTiles: renderExclusiveTiles,
    }}
    {...props}
  />
);

const renderList = ({ display, games }) => (
  <ScrollingContainer
    padding={{
      default: "small",
      tablet: "xlarge",
      desktop: "xlarge",
    }}
    itemSpacing={display === "cards" ? "small" : "default"}
  >
    <CardsOrTiles display={display} games={games} />
  </ScrollingContainer>
);

const renderSkeleton = ({ display }) => (
  <GameListSkeleton
    itemWidth={display === "cards" ? 320 : 160}
    itemRatio={display === "cards" ? 0.98 : 1.2}
    itemGap={display === "cards" ? 16 : 8}
    display={display}
    title={false}
    preserveAspectRatio="xMinYMin"
    colorLow="#eff6f6"
    colorHi="#ffffff"
    className="u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
  />
);

const LoadingOrList = props => (
  <Matcher
    getKey={({ condition }) => condition}
    matchers={{
      list: renderList,
      loading: renderSkeleton,
    }}
    {...props}
  />
);

const GameList = props => {
  const { games, title, link } = props;
  const loading = games.length ? "list" : "loading";
  return (
    <div className="u-padding-top--semi">
      <div className="u-display--flex">
        <Text
          className={classNames(
            "u-padding-bottom--small",
            "u-padding-bottom--normal@tablet",
            "u-padding-bottom--normal@desktop",
            "u-padding-left--small",
            "u-padding-left--xlarge@tablet",
            "u-padding-left--xlarge@desktop",
            "u-font-weight-bold",
            link && "flex-1"
          )}
          tag="h3"
        >
          {title}
        </Text>
      </div>

      <LoadingOrList condition={loading} {...props} />
    </div>
  );
};

export default GameList;
