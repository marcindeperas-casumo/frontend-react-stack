// @flow
import React from "react";
import type { Node } from "react";
import logger from "Services/logger";
import { isNilOrEmpty } from "Utils/utils";
import ScrollableList from "Components/ScrollableList";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";

type Props = {
  error: any,
  loading: boolean,
  valuableIds: Array<string>,
  ValuableCard: ({ id: string }) => Node,
  listTitle: string,
};

export const PlayerValuableListHorizontal = ({
  error = false,
  loading = false,
  valuableIds = [],
  ValuableCard,
  listTitle = "",
}: Props) => {
  if (error) {
    logger.error(`
      PlayerValuableListHorizontal failed:
      ${error}
    `);

    return null;
  }

  if (loading) {
    return <GameListHorizontalSkeleton key="player-valuables-list-skeleton" />;
  }

  if (isNilOrEmpty(valuableIds)) {
    return null;
  }

  return (
    <ScrollableList
      title={listTitle}
      itemIds={valuableIds}
      seeMoreText=""
      Component={ValuableCard}
    />
  );
};
