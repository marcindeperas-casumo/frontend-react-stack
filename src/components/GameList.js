import React from "react";
import Heading from "@casumo/cmp-heading";
import ResponsiveImage from "@casumo/cmp-responsive-image";
import ScrollingContainer from "@casumo/cmp-scrollable";

import { KO_APP_EVENT_LAUNCH_GAME } from "../constants";
import legacyBridge from "../legacyBridge";
import { decodeString } from "../utils";
import GameTile from "./GameTile";
import Card from "./Card";

const renderImage = o => {
  const src =
    (o.lobby && o.lobby.videoSnapshot.thumbnails["L"]) || o.logoBackground;
  return (
    <ResponsiveImage
      className="c-card__img-pic"
      src={src}
      imgixOpts={{ w: 320, h: 180, fit: "clamp" }}
      mark={o.logo}
    />
  );
};

const emitLaunchGame = slug => {
  legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });
};

const GameList = ({ id, title, games }) => (
  <div className="u-padding-top--normal u-padding-top--semi@tablet u-padding-top--semi@desktop">
    <Heading
      className="u-padding-bottom--small u-padding-bottom--normal@tablet u-padding-bottom--normal@desktop
      u-padding-left--small u-padding-left--xlarge@tablet u-padding-left--xlarge@desktop"
      text={title}
      rank={3}
      size="uno"
    />
    <ScrollingContainer padded>
      {id === "liveCasinoGames"
        ? games.map(o => (
            <Card
              className="u-margin-right"
              key={o.slug}
              image={renderImage(o)}
              title={decodeString(o.name)}
              players={o.lobby && o.lobby.players}
              cta={{ text: "Play Now", link: () => emitLaunchGame(o.slug) }}
              betLimits={o.lobby && o.lobby.betLimits["EUR"]}
            />
          ))
        : games.map(o => {
            return (
              <GameTile
                className="c-scrollable-game t-border-r--8"
                key={o.slug}
                {...o}
              />
            );
          })}
    </ScrollingContainer>
  </div>
);

export default GameList;
