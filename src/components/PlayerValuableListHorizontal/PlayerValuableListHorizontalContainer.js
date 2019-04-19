// @flow
import React from "react";
import { Query } from "react-apollo";
import { map } from "ramda";
import ScrollableList from "Components/ScrollableList";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";

class PlayerValuablesTypedQuery extends Query<PlayerValuablesQuery, null> {}

const findById = (list, id) => list.find(item => item.id === id);
const mapIds = map(x => x.id);

const TileConnected = ({ id, state, usables }) => (
  <div>
    {id}
    <br />
    {state}
    <br />
    {JSON.stringify(usables)}
  </div>
);

const withValuableData = valuables => ({ id }) => {
  const valuable = findById(valuables, id);

  if (!valuable) {
    return null;
  }

  const { state, usables } = valuable;

  return <TileConnected id={id} state={state} usables={usables} />;
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
