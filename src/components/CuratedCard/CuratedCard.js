// @flow
import React, { PureComponent } from "react";
import CuratedCardBackground from "./CuratedCardBackground";
import CuratedGameContent from "./CuratedCardContent";
// eslint-disable-next-line
import Styles from "./CuratedCard.scss";

type Props = {
  data: any,
};

export default class CuratedGame extends PureComponent<Props> {
  render() {
    const { data } = this.props;

    return (
      <div className="c-curated-card o-ratio o-ratio--curated-card t-border-r--8">
        <CuratedCardBackground className="o-ratio__content" data={data} />
        <CuratedGameContent
          className="o-ratio__content u-padding--md@mobile u-padding--lg"
          data={data}
        />
      </div>
    );
  }
}
