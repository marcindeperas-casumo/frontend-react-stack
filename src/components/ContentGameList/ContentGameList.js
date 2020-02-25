// @flow
import React, { PureComponent } from "react";
import { EVENT_PROPS } from "Src/constants";
import { GameListVertical } from "Components/GameListVertical";
import TrackProvider from "Components/TrackProvider";

type Props = {
  /** The list of game ids. */
  ids: Array<string>,
};

export class ContentGameList extends PureComponent<Props> {
  render() {
    const ids = this.props.ids || [];
    return (
      <div className="u-padding-x--lg u-margin-bottom--lg">
        <TrackProvider
          data={{ [EVENT_PROPS.LOCATION]: "Promotions - Detail Page" }}
        >
          <GameListVertical slugs={ids} />
        </TrackProvider>
      </div>
    );
  }
}
