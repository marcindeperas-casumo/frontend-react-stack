// @flow
import React, { PureComponent } from "react";
import ScrollingContainer from "@casumo/cmp-scrollable";

import { KO_APP_EVENT_LAUNCH_GAME } from "../../constants";
import legacyBridge from "../../legacyBridge";

import GameListTiles from "Components/GameList/GameListTiles";
import GameListTitle from "Components/GameList/GameListTitle";
import GameListExclusiveTiles from "Components/GameList/GameListExclusiveTiles";
import LiveCasinoCard from "Components/LiveCasinoCard";

export const emitLaunchGame = (slug: string) => {
  legacyBridge.emit(KO_APP_EVENT_LAUNCH_GAME, {
    slug,
    playForFun: false,
  });
};

const renderLiveCasinoCards = ({ games }) =>
  games.map(game => <LiveCasinoCard game={game} key={game.slug} />);

const renderTiles = ({ games }) =>
  games.map(game => <GameListTiles game={game} key={game.slug} />);

const renderExclusiveTiles = ({ games }) =>
  games.map(game => <GameListExclusiveTiles game={game} key={game.slug} />);

const displayType = {
  liveCasinoCards: renderLiveCasinoCards,
  exclusiveTiles: renderExclusiveTiles,
  tiles: renderTiles,
  default: renderTiles,
};

const paddingPerDevice = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

type Props = {|
  games: any[],
  display?: "liveCasinoCards" | "exclusiveTiles" | "tiles",
  title?: string,
  link?: string,
|};

export default class GameList extends PureComponent<Props> {
  render() {
    const { display = "tiles", title, link } = this.props;
    return (
      <div className="u-padding-top--xlg">
        <div className="u-display--flex">
          <GameListTitle title={title} link={link} />
        </div>
        <ScrollingContainer
          padding={paddingPerDevice}
          itemSpacing={display === "liveCasinoCards" ? "md" : "default"}
        >
          {(displayType[display] || displayType.default)(this.props)}
        </ScrollingContainer>
      </div>
    );
  }
}
