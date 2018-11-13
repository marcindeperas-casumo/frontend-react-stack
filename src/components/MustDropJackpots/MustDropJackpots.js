// @flow
import React, { PureComponent } from "react";
import GameRow from "Components/GameRow";
import MustDropJackpotsSkeleton from "Components/MustDropJackpots/MustDropJackpotsSkeleton";

type Props = {
  ids: Array<string>,
};
export default class MustDropJackpots extends PureComponent<Props> {
  render() {
    const { ids, isLoaded } = this.props;

    return !isLoaded ? (
      <MustDropJackpotsSkeleton />
    ) : (
      <div className="u-padding--md">
        {ids.map(id => (
          <GameRow id={id} key={`jackpot-${id}`} />
        ))}
      </div>
    );
  }
}
