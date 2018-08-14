import React from "react";
import Heading from "@casumo/cmp-heading";
import Card from "@casumo/cmp-card";
import { PlayerIcon } from "@casumo/cmp-icons";
import LazyImage from "./LazyImage";
import ScrollingContainer from "@casumo/cmp-scrollable";
import classNames from "classnames";

import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";
import legacyBridge from "../legacyBridge";
import { decodeString } from "../utils";

import GameTile from "./GameTile";
import Matcher from "./Matcher";
import CardData from "./CardData";
import GameListSkeleton from "./GameListSkeleton";

const renderImage = src => (
  <LazyImage
    className="c-card__img-pic"
    style={{ width: "100%" }}
    src={src}
    dpr={3}
  />
);

const renderPlayers = n => (
  <div className="o-flex-align--center">
    <PlayerIcon className="u-margin-vert t-color-grey" size="sml" />
    <span className="u-margin-left--micro u-margin-vert">{n}</span>
  </div>
);

const renderBets = o => (o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "");

const emitLaunchGame = slug => {
  legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });
};

const renderCardData = game => game.results && <CardData game={game} />;

const renderCards = ({ games }) =>
  games.map(o => (
    <Card
      className="u-margin-right--small"
      key={o.slug}
      image={renderImage(o.lobby.image)}
      cardData={renderCardData(o.lobby)}
      heading={decodeString(o.name)}
      footer={renderPlayers(o.lobby.players)}
      cta={{ text: "Play Now", link: () => emitLaunchGame(o.slug) }}
      text={renderBets(o.lobby.bets)}
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
  const { games, title, link } = props;
  const loading = games.length ? "list" : "loading";
  return (
    <div className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop">
      <div className="u-display--flex">
        <Heading
          className={classNames(
            "u-padding-bottom--small",
            "u-padding-bottom--normal@tablet",
            "u-padding-bottom--normal@desktop",
            "u-padding-left--small",
            "u-padding-left--xlarge@tablet",
            "u-padding-left--xlarge@desktop",
            link && "flex-1"
          )}
          text={title}
          rank={3}
          size="uno"
        />

        {link && (
          <a
            className="u-padding-right--small u-padding-right--xlarge@tablet u-padding-right--xlarge@desktop u-font-weight--bold"
            target="_blank"
            href={link}
            rel="noopener noreferrer"
          >
            Go To Lobby
          </a>
        )}
      </div>

      <LoadingOrList condition={loading} {...props} />
    </div>
  );
};

export default GameList;
