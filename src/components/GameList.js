import React from "react";
import Heading from "@casumo/cmp-heading";
import Card from "@casumo/cmp-card";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import ScrollingContainer from "@casumo/cmp-scrollable";

import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";
import legacyBridge from "../legacyBridge";
import { decodeString } from "../utils";

import GameTile from "./GameTile";
import Matcher from "./Matcher";
import CardData from "./CardData";
import GameListSkeleton from "./GameListSkeleton";

const renderImage = o => {
  const src =
    (o.lobby && o.lobby.videoSnapshot.thumbnails["L"]) || o.logoBackground;
  return <ResponsiveImage className="c-card__img-pic" src={src} />;
};

const emitLaunchGame = slug => {
  legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });
};

const renderCardData = results => results && <CardData results={results} />;

const renderCards = ({ games }) =>
  games.map(o => (
    <Card
      className="u-margin-right--small"
      key={o.slug}
      image={renderImage(o)}
      cardData={renderCardData(o.lobby.results)}
      title={decodeString(o.name)}
      players={o.lobby && o.lobby.players}
      cta={{ text: "Play Now", link: () => emitLaunchGame(o.slug) }}
      betLimits={o.lobby && o.lobby.betLimits["EUR"]}
    />
  ));

const renderTiles = ({ games }) =>
  games.map(o => (
    <GameTile className="c-scrollable-game t-border-r--8" key={o.slug} {...o} />
  ));

const renderList = ({ display, games }) => (
  <ScrollingContainer padded>
    <CardsOrTiles display={display} games={games} />
  </ScrollingContainer>
);

const renderSkeleton = ({ display }) => (
  <GameListSkeleton
    itemWidth={display === "cards" ? 336 : 180}
    itemRatio={display === "cards" ? 0.92 : 1.2}
    itemGap={display === "cards" ? 16 : 8}
    display={display}
    title={false}
    preserveAspectRatio="xMinYMin"
    colorLow="#eff6f6"
    colorHi="#ffffff"
    className="u-padding-top--semi@tablet u-padding-top--semi@desktop
    u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
  />
);

const CardsOrTiles = props => (
  <Matcher
    getKey={({ display }) => display}
    matchers={{
      cards: renderCards,
      tiles: renderTiles,
    }}
    {...props}
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
  const { games, title } = props;
  const loading = games.length ? "list" : "loading";
  return (
    <div className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop">
      <Heading
        className="u-padding-bottom--small u-padding-bottom--normal@tablet u-padding-bottom--normal@desktop
        u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
        text={title}
        rank={3}
        size="uno"
      />

      <LoadingOrList condition={loading} {...props} />
    </div>
  );
};

export default GameList;
