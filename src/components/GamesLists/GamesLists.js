import React, { PureComponent } from "react";
import { connect } from "react-redux";
import GameListTitle from "Components/GameList/GameListTitle";
import ScrollingContainer from "@casumo/cmp-scrollable";
import GameTile from "Components/GameTile";
import Flex from "@casumo/cmp-flex";

const paddingPerDevice = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

const emitLaunchGame = x => console.debug("emitLaunchGame", x);

export class GameExclusive extends PureComponent {
  render() {
    const { slug } = this.props;
    return (
      <Flex.Item className="o-flex__item-fixed-size o-flex c-exclusive-game">
        <GameTile
          {...this.props}
          ratio="game-tile-exclusive"
          imgixOpts={{
            w: 188,
            h: 280,
            fit: "crop",
          }}
          launchGame={() => emitLaunchGame(slug)}
        />
      </Flex.Item>
    );
  }
}

export class Game extends PureComponent {
  render() {
    const { slug } = this.props;
    return (
      <Flex.Item className="o-flex__item-fixed-size c-top-game">
        {<GameTile {...this.props} launchGame={() => emitLaunchGame(slug)} />}
      </Flex.Item>
    );
  }
}

const GameContainer = connect((state, props) => state.entities.games[props.id])(
  Game
);
const ExclusiveGameContainer = connect(
  (state, props) => state.entities.games[props.id]
)(GameExclusive);

export class ListOfGames extends PureComponent {
  render() {
    const { title, games, gameComponent: Component } = this.props;
    return (
      <div className="u-padding-top--xlg">
        <div className="u-display--flex">
          <GameListTitle title={title} />
        </div>

        <ScrollingContainer padding={paddingPerDevice}>
          {games.map(gameId => (
            <Component key={gameId} id={gameId} />
          ))}
        </ScrollingContainer>
      </div>
    );
  }
}

const a = { exclusiveGames: ExclusiveGameContainer, default: GameContainer };
const ListOfGamesContainer = connect((state, props) => {
  return {
    ...state.entities.lists[props.listId],
    gameComponent: a[props.listId] || a.default,
  };
})(ListOfGames);

export class ListOfGamesLists extends PureComponent {
  render() {
    const { listIds } = this.props;
    return listIds.map(listId => {
      return <ListOfGamesContainer key={listId} listId={listId} />;
    });
  }
}

export default ListOfGamesLists;
