// @flow
import React from "react";
import { Query } from "react-apollo";
import { map } from "ramda";
import ScrollableList from "Components/ScrollableList";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";
import PlayerValuableTile from "./PlayerValuableTile";

class PlayerValuablesTypedQuery extends Query<PlayerValuablesQuery, null> {}

const findById = (list, id) => list.find(item => item.id === id);
const mapIds = map(x => x.id);

const withValuableData = valuables => ({ id }) => {
  const valuable = findById(valuables, id);

  if (!valuable) {
    return null;
  }

  return <PlayerValuableTile id={id} valuable={valuable} />;
};

const PlayerValuableListHorizontalContainer = () => (
  <PlayerValuablesTypedQuery query={LocalQuery}>
    {({ loading, data }) => {
      const { player: { valuables = [] } = {} } = data;

      return (
        <ScrollableList
          title="Valuables TEST ONLY"
          itemIds={mapIds(valuables)}
          seeMoreText=""
          Component={withValuableData(valuables)}
        />
      );
    }}
  </PlayerValuablesTypedQuery>
);

export default PlayerValuableListHorizontalContainer;
