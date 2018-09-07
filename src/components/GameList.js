import React from "react";
import Text from "@casumo/cmp-text";
import Heading from "@casumo/cmp-heading";
import Card from "@casumo/cmp-card";
import { PlayerIcon } from "@casumo/cmp-icons";
import LazyImage from "./LazyImage";
import ScrollingContainer from "@casumo/cmp-scrollable";
import classNames from "classnames";

import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";
import legacyBridge from "../legacyBridge";
import { decodeString } from "../lib/utils";

import GameTile from "./GameTile";
import Matcher from "./Matcher";
import CardData from "./CardData";
import GameListSkeleton from "./GameListSkeleton";
import CMSField from "./CMSField";

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
    <span className="u-margin-left--micro u-margin-vert u-font-weight-bold t-color-grey-dark-2">
      {n}
    </span>
  </div>
);

const renderBets = o => (o ? `${o.symbol}${o.min} - ${o.symbol}${o.max}` : "");

const emitLaunchGame = slug => {
  legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });
};

const renderCardData = game => <CardData game={game} />;

const renderCards = ({ games }) =>
  games.map(o => (
    <Card
      className="u-margin-right--small"
      key={o.slug}
      image={renderImage(o.lobby.image)}
      cardData={renderCardData(o.lobby)}
      heading={
        <Text tag="strong" className="t-color-grey-dark-2">
          {decodeString(o.name)}
        </Text>
      }
      footer={renderPlayers(o.lobby.players)}
      cta={{
        text: (
          <Text className="u-text-transform-capitalize" tag="strong">
            <CMSField
              slug="mobile.live-casino-cards-content"
              field="play_now"
            />
          </Text>
        ),
        onClick: () => emitLaunchGame(o.slug),
      }}
      text={renderBets(o.lobby.bets)}
    />
  ));

const renderTiles = ({ games }) =>
  games.map(game => (
    <GameTile
      key={game.slug}
      {...game}
      launchGame={() => emitLaunchGame(game.slug)}
    />
  ));

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

const renderList = ({ display, games }) => (
  <ScrollingContainer padded>
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
    <div className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop">
      <div className="u-display--flex">
        <Heading
          className={classNames(
            "c-scrollable-list-title",
            "u-padding-bottom--small",
            "u-padding-bottom--normal@tablet",
            "u-padding-bottom--normal@desktop",
            "u-padding-left--small",
            "u-padding-left--xlarge@tablet",
            "u-padding-left--xlarge@desktop",
            "u-font-weight-normal",
            link && "flex-1"
          )}
          text={title}
          rank={3}
          size="uno"
        />

        {link &&
          !window.native && (
            <CMSField
              slug="mobile.live-casino-cards-content"
              field="go_to_lobby"
              view={text => (
                <a
                  className="u-padding-right--small u-padding-right--xlarge@tablet u-padding-right--xlarge@desktop u-font-weight-bold"
                  target="_blank"
                  href={link}
                  rel="noopener noreferrer"
                >
                  {text}
                </a>
              )}
            />
          )}
      </div>

      <LoadingOrList condition={loading} {...props} />
    </div>
  );
};

export default GameList;
