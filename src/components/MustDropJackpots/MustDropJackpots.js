// @flow
import React, { PureComponent } from "react";
import GameRow from "Components/GameRow";

type Props = {
  ids: Array<string>,
};
export default class MustDropJackpots extends PureComponent<Props> {
  render() {
    const { ids } = this.props;

    return (
      <div className="u-padding--md">
        {ids.map(id => (
          <GameRow id={id} key={`jackpot-${id}`} />
        ))}
      </div>
    );
  }
}
