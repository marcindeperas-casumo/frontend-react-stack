// @flow
import React from "react";
import { EVENT_PROPS } from "Src/constants";
import { GameListVertical } from "Components/GameListVertical";
import TrackProvider from "Components/TrackProvider";

type Props = {
  /** The list of game slugs - unfortunately it's still named "ids" in the CMS. */
  ids: Array<string>,
};

export const ContentGameList = ({ ids = [] }: Props) => (
  <div className="u-padding-x--lg u-margin-bottom--lg">
    <TrackProvider
      data={{ [EVENT_PROPS.LOCATION]: "Promotions - Detail Page" }}
    >
      <GameListVertical slugs={ids} />
    </TrackProvider>
  </div>
);
