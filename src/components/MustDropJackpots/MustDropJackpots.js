// @flow
import React, { PureComponent } from "react";
import GameRow from "Components/GameRow";

type Props = {
  ids: Array<string>,
};
export default class MustDropJackpots extends PureComponent<Props> {
  render() {
    const { ids, isLoaded } = this.props;

    return !isLoaded ? (
      <div> SKELETON BAE </div> // implement proper skeleton state
    ) : (
      <div className="u-padding--md">
        {ids.map(id => (
          <GameRow id={id} key={`jackpot-${id}`} />
        ))}
      </div>
    );
  }
}
