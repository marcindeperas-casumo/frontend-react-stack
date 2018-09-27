// @flow
import React, { PureComponent } from "react";
import CuratedGameImage from "./CuratedGameImage";
import CuratedGameContent from "./CuratedGameContent";
// eslint-disable-next-line
import Styles from "./CuratedGame.scss";

type Props = {
  data: any,
};

export default class CuratedGame extends PureComponent<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className="c-curated o-ratio o-ratio--curated-card t-border-r--8">
        <CuratedGameImage className="o-ratio__content" data={data} />
        <CuratedGameContent
          className="o-ratio__content u-padding--md@mobile u-padding--lg"
          data={data}
        />
      </div>
    );
  }
}
