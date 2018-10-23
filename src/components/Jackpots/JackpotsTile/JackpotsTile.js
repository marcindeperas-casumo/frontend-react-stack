// @flow
import React, { PureComponent } from "react";
import JackpotsTileRow from "../JackpotsTileRow";

type Props = {
  ids?: Array<string>,
};

// TODO: Move this out to make it reusable
export default class JackpotsTile extends PureComponent<Props> {
  render() {
    const { ids = [] } = this.props;

    return (
      <div className="c-jackpots-tile o-flex__item o-flex__item-fixed-size u-padding-bottom--md">
        {ids.map(id => (
          <JackpotsTileRow id={id} key={`jackpot-${id}`} />
        ))}
      </div>
    );
  }
}
