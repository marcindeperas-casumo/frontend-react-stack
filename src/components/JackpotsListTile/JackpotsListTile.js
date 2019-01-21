// @flow
import React, { PureComponent } from "react";
import GameRow from "Components/GameRow";
import List from "@casumo/cmp-list";
import "./JackpotsListTile.scss";

type Props = {
  ids?: Array<string>,
};

export default class JackpotsListTile extends PureComponent<Props> {
  render() {
    const { ids = [] } = this.props;

    return (
      <div className="c-jackpots-list-tile o-flex__item o-flex__item-fixed-size">
        <List items={ids} render={id => <GameRow id={id} />} />
      </div>
    );
  }
}
