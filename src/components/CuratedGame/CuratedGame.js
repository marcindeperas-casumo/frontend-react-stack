// @flow
import React, { PureComponent } from "react";
import CuratedGameImage from "./CuratedGameImage";
import CuratedGameContent from "./CuratedGameContent";

type Props = {
  data: any,
};

export default class CuratedGame extends PureComponent<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className="c-curated o-ratio">
        <CuratedGameImage className="o-ratio__content" data={data} />
        <CuratedGameContent className="o-ratio__content" data={data} />
      </div>
    );
  }
}
