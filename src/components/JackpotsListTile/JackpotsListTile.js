// @flow
import React, { PureComponent } from "react";
import { GameRow } from "Components/GameRow";
import "./JackpotsListTile.scss";

type Props = {
  ids?: Array<string>,
};

export default class JackpotsListTile extends PureComponent<Props> {
  render() {
    const { ids = [] } = this.props;

    return (
      <>
        {ids.map(slug => (
          <div key={slug} className="u-padding-y--sm">
            <GameRow id={slug} />
          </div>
        ))}
      </>
    );
  }
}
