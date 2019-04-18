// @flow
import React from "react";
import { Query } from "react-apollo";
import { map } from "ramda";
import ScrollableList from "Components/ScrollableList";
import ScrollableListTitle from "Components/ScrollableListTitle";
// $FlowIgnore - Flow doesn't understand the queries imported by name.
import { PlayerValuablesQuery as LocalQuery } from "./PlayerValuables.graphql";

class PlayerValuablesTypedQuery extends Query<PlayerValuablesQuery, null> {}

const noop = () => {};

const findById = (list, id) => list.find(item => item.id === id);
const mapIds = map(x => x.id);

const TileConnected = ({ id, state }) => (
  <div>
    {id}
    <br />
    {state}
  </div>
);

const withValuableData = valuables => ({ id }) => {
  const valuable = findById(valuables, id);

  if (!valuable) {
    return null;
  }

  const { state } = valuable;

  return <TileConnected id={id} state={state} {...valuable} />;
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
