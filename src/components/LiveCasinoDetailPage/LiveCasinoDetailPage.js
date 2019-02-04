// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import GameRow from "Components/GameRow/GameRow";
import SectionTitle from "./SectionTitle";
import type { GameId, GroupedGamesList } from "./types";

type Props = {
  /** comes from redux */
  launchGame: GameId => void,
  /** comes from redux */
  gamesList: GroupedGamesList,
  /** comes from redux */
  isFetched: boolean,
  /** comes from redux */
  fetchPageBySlug: Function,
};

export default class LiveCasinoDetailPage extends PureComponent<Props> {
  componentDidMount() {
    if (!this.props.isFetched) this.props.fetchPageBySlug();
  }

  render() {
    return (
      <div className="u-padding-horiz--md u-padding-bottom--md">
        {this.props.gamesList.map(({ id, title, gamesInSection }) => (
          <React.Fragment key={id}>
            <SectionTitle title={title} />
            <List
              items={gamesInSection}
              render={game => (
                <GameRow
                  game={game}
                  onLaunchGame={() => this.props.launchGame(game.gameId)}
                />
              )}
            />
          </React.Fragment>
        ))}
      </div>
    );
  }
}
