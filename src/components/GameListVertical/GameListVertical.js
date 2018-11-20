// @flow
import React, { PureComponent } from "react";
import List from "Components/List";
import GameListRow from "Components/GameListRow";

type Props = {
  /** The list of game ids. */
  ids: Array<string>,
};

export class GameListVertical extends PureComponent<Props> {
  render() {
    const { ids = [] } = this.props;

    return <List items={ids} render={id => <GameListRow id={id} />} />;
  }
}

export default GameListVertical;
