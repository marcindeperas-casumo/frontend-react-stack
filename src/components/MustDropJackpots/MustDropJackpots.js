// @flow
import React, { PureComponent } from "react";
import JackpotsTileRow from "Components/JackpotsTileRow";

type Props = {
  ids: Array<string>,
};
export default class MustDropJackpots extends PureComponent<Props> {
  render() {
    const { ids } = this.props;

    return (
      <div className="">
        {ids.map(id => (
          <JackpotsTileRow id={id} key={`jackpot-${id}`} />
        ))}
      </div>
    );
  }
}
