// @flow
import React, { PureComponent } from "react";
import { CuratedCard } from "Components/CuratedCard";

type Props = {
  /** The id of the card to render. */
  card: string,
};

export class TopListCuratedCard extends PureComponent<Props> {
  render() {
    return (
      <div className="u-margin-top--md@mobile u-margin-top--md@phablet u-margin-top--lg@tablet u-margin-x--md@mobile u-margin-x--md@phablet u-margin-x--3xlg@tablet t-border-r--16 t-border-r--none@desktop">
        <CuratedCard {...this.props} />
      </div>
    );
  }
}
