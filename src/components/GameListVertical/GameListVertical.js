// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import { GameRow } from "Components/GameRow";

type Props = {
  /** The list of game ids. */
  ids: Array<string>,
  /** the function that fetches the games */
  fetch: () => void,
};

export class GameListVertical extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetch();
  }

  render() {
    // TODO: Previously if the content builder passed in an empty
    // string it broke. Figure out how we can properly handle
    // these errors without having to do really defensive coding
    // in all the components.
    const ids = this.props.ids || [];
    return (
      <div className="o-list-wrapper">
        {ids.map(id => (
          <div key={id} className="u-margin-bottom">
            <GameRow id={id} />
          </div>
        ))}
      </div>
    );
  }
}
