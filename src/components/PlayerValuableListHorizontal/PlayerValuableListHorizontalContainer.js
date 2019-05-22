// @flow
import React from "react";
import { Query } from "react-apollo";
import { map } from "ramda";
import ScrollableList from "Components/ScrollableList";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { isNilOrEmpty } from "Utils/utils";
import ValuableCard from "Components/ValuableCard";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";

// This is far from ideal and is just temporary.
// We need to update the list of player vauables because sometimes they come through Cometd
// channel.
const REFRESH_INTERVAL = 15000;

class PlayerValuablesTypedQuery extends Query<PlayerValuablesQuery, null> {}

const findById = (list: Array<any>, id: string) =>
  list.find(item => item.id === id);

const mapIds = map(x => x.id);

const withValuableData = (
  valuables: Array<PlayerValuablesQuery_player_valuables>
) => ({ id }) => {
  const valuable = findById(valuables, id);

  if (!valuable) {
    return null;
  }

  return <ValuableCard {...valuable} />;
};

export const PlayerValuableListHorizontalContainer = () => (
  <PlayerValuablesTypedQuery query={LocalQuery} pollInterval={REFRESH_INTERVAL}>
    {({ loading, error, data }) => {
      if (error) {
        console.error(`
          PlayerValuableListHorizontalContainer failed:
          ${error}
        `);

        return null;
      }

      if (loading) {
        return (
          <GameListHorizontalSkeleton key="player-valuables-list-skeleton" />
        );
      }

      const { listTitle, player: { valuables = [] } = {} } = data;

      if (isNilOrEmpty(valuables)) {
        return null;
      }

      return (
        <ScrollableList
          title={listTitle}
          itemIds={mapIds(valuables)}
          seeMoreText=""
          Component={withValuableData(valuables)}
        />
      );
    }}
  </PlayerValuablesTypedQuery>
);
