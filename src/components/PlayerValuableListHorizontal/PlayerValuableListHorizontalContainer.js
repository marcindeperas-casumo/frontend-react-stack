// @flow
import React from "react";
import type { Node } from "react";
import { Query } from "react-apollo";
import { find, propEq, pluck } from "ramda";
import Flex from "@casumo/cmp-flex";
import logger from "Services/logger";
import ValuableCard from "Components/ValuableCard";
import { PlayerValuableListHorizontal } from "./PlayerValuableListHorizontal";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";

// This is far from ideal and is just temporary.
// We need to update the list of player valuables because sometimes they come through Cometd
// channel.
const REFRESH_INTERVAL = 15000;

class PlayerValuablesTypedQuery extends Query<PlayerValuablesQuery, null> {}

const mapIds = pluck("id");

const withValuableData = (
  valuables: Array<PlayerValuablesQuery_player_valuables>
) => ({ id }): Node => {
  const valuable = find(propEq("id", id))(valuables);

  if (!valuable) {
    return null;
  }

  return (
    <Flex.Item className="o-flex__item-fixed-size">
      <ValuableCard {...valuable} />
    </Flex.Item>
  );
};

export const PlayerValuableListHorizontalContainer = () => (
  <PlayerValuablesTypedQuery query={LocalQuery} pollInterval={REFRESH_INTERVAL}>
    {({ loading, error, data }) => {
      // if (error) {
      //   return <PlayerValuableListHorizontal error={error} />;
      // }

      // if (loading) {
      //   return <PlayerValuableListHorizontal loading={loading} />;
      // }

      const { listTitle, player: { valuables = [] } = {} } = data;

      return (
        <PlayerValuableListHorizontal
          error={error}
          loading={loading}
          listTitle={listTitle}
          valuableIds={mapIds(valuables)}
          ValuableCard={withValuableData(valuables)}
        />
      );
    }}
  </PlayerValuablesTypedQuery>
);
