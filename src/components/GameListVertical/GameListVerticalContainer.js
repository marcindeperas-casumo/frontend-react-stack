// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GameListVertical } from "Components/GameListVertical/GameListVertical";
import { GameListVerticalQuery } from "./GameListVertical.graphql";

type Props = {
  /** The array of ids to show in a game list. */
  slugs: Array<string>,
};

export const GameListVerticalContainer = ({ slugs }: Props) => {
  const variables = { slugs };
  const { data, loading } = useQuery(GameListVerticalQuery, { variables });

  if (loading || !data) {
    return null;
  }

  return <GameListVertical games={data.gamesBySlugs} />;
};
