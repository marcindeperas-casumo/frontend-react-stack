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
    // TODO: Previously if the content builder passed in an empty
    // string it broke. Figure out how we can properly handle
    // these errors without having to do really defensive coding
    // in all the components.
    const ids = this.props.ids || [];

    return <List items={ids} render={id => <GameRow id={id} />} />;
  }
}

export default GameListVertical;
