// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { ReelRaceCard } from "./ReelRaceCard";
import { ReelRaceCardCMSQuery } from "./ReelRaceCard.graphql";

// __FIX__: this should take a game but because of
// https://github.com/Casumo/frontend-react-stack/blob/master/src/components/ScrollableList/ScrollableList.js#L42
export const ReelRaceCardContainer = ({ item }) => {
  return <ReelRaceCard reelRace={item} />;
};
