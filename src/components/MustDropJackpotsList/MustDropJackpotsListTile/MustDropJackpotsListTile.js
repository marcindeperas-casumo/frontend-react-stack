// @flow
import React, { PureComponent } from "react";
import GameRow from "Components/GameRow";
import List from "Components/List";

type Props = {
  ids?: Array<string>,
};

// TODO: Move this out to make it reusable
export default class MustDropJackpotsListTile extends PureComponent<Props> {
  render() {
    const { ids = [] } = this.props;

    return (
      <div className="c-must-drop-jackpots-tile o-flex__item o-flex__item-fixed-size u-padding-bottom--md">
        <List items={ids} render={id => <GameRow id={id} />} />
      </div>
    );
  }
}
