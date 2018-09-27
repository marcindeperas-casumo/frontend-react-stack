import React, { PureComponent } from "react";
import GameListTitle from "Components/GameList/GameListTitle";
import ScrollingContainer from "@casumo/cmp-scrollable";
import GameTile from "Components/GameTile";
import Flex from "@casumo/cmp-flex";

const paddingPerDevice = {
  default: "md",
  tablet: "2xlg",
  desktop: "2xlg",
};

const game = {
  name: "Gonzo&#8217;s Quest",
  slug: "gonzos-quest",
  logoBackground:
    "https://cms.casumo.com/wp-content/uploads/2014/06/GonzosQuest_Thumb.jpg",
  logo:
    "https://cms.casumo.com/wp-content/uploads/2014/02/GonzosQuest_Logo.png",
  hasPlayForFun: true,
  inMaintenanceMode: false,
  jackpotId: null,
};

class Game extends PureComponent {
  render() {
    const { id } = this.props;
    return (
      <Flex.Item className="o-flex__item-fixed-size c-top-game">
        {
          <GameTile
            {...{ ...game, name: game.name + id }}
            launchGame={() => null}
          />
        }
      </Flex.Item>
    );
  }
}

class GameContainer extends PureComponent {
  render() {
    const { id } = this.props;
    return <Game id={`resolved ${id}`} />;
  }
}

class Game2 extends PureComponent {
  render() {
    return (
      <div className="u-padding-left--xlg" style={{ background: "red" }}>
        {this.props.id}
      </div>
    );
  }
}

class Game2Container extends PureComponent {
  render() {
    const { id } = this.props;
    return <Game2 id={`resolved ${id}`} />;
  }
}

class ListOfGames extends PureComponent {
  render() {
    const { title, gameIds, gameComponent: Component } = this.props;
    return (
      <div className="u-padding-top--xlg">
        <div className="u-display--flex">
          <GameListTitle title={title} />
        </div>

        <ScrollingContainer padding={paddingPerDevice}>
          {gameIds.map(gameId => (
            <Component key={gameId} id={gameId} />
          ))}
        </ScrollingContainer>
      </div>
    );
  }
}

class ListOfGamesContainer extends PureComponent {
  render() {
    const { listId } = this.props;
    const gameIds = Array(30)
      .fill(listId)
      .map((x, i) => `${x} ${i}`);

    const C = listId === "list-1" ? GameContainer : Game2Container;
    return <ListOfGames gameComponent={C} title={listId} gameIds={gameIds} />;
  }
}

class ListOfGamesLists extends PureComponent {
  render() {
    const { listIds } = this.props;
    return listIds.map(listId => {
      return <ListOfGamesContainer key={listId} listId={listId} />;
    });
  }
}

export default ListOfGamesLists;
