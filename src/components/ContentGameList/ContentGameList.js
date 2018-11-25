// @flow
import React, { PureComponent } from "react";
import GameListVertical from "Components/GameListVertical";

type Props = {
  /** The list of game ids. */
  ids: Array<string>,
};

class ContentGameList extends PureComponent<Props> {
  render() {
    const ids = this.props.ids || [];
    return (
      <div className="u-padding-horiz--lg u-margin-bottom--lg">
        <GameListVertical ids={ids} />
      </div>
    );
  }
}

export default ContentGameList;
