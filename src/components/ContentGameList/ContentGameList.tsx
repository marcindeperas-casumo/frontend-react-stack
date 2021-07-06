import React from "react";
import cx from "classnames";
import { EVENT_PROPS } from "Src/constants";
import { GameListVertical } from "Components/GameListVertical";
import TrackProvider from "Components/TrackProvider";

type Props = {
  /** The list of game slugs - unfortunately it's still named "ids" in the CMS. */
  ids: Array<string>;
  /** The Column width this item should span in the grid layout, currently supporting 2 columns  */
  gridColumnWidth?: string;
};

export const ContentGameList = ({ ids = [], gridColumnWidth = "2" }: Props) => (
  <div
    className={cx(
      "px-lg mb-lg",
      gridColumnWidth && `col-span-${gridColumnWidth}`
    )}
  >
    <TrackProvider
      data={{ [EVENT_PROPS.LOCATION]: "Promotions - Detail Page" }}
    >
      <GameListVertical slugs={ids} />
    </TrackProvider>
  </div>
);
