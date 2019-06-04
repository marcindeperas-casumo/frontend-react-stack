// @flow
import React, { PureComponent } from "react";
import List from "@casumo/cmp-list";
import { GameRow } from "Components/GameRow";
import "./JackpotsListTile.scss";

type Props = {
  ids?: Array<string>,
};

export default class JackpotsListTile extends PureComponent<Props> {
  render() {
    const { ids = [] } = this.props;

    return <List items={ids} render={id => <GameRow id={id} />} />;
  }
}
