// @flow
import React, { PureComponent } from "react";
import List from "Components/List";
import GameRow from "Components/GameRow";

type Props = {
  /** The list of game ids. */
  ids: Array<string>,
};

export class GameListVertical extends PureComponent<Props> {
  render() {
    const { ids = [] } = this.props;

    return <List items={ids} render={id => <GameRow id={id} />} />;
  }
}

export default GameListVertical;
