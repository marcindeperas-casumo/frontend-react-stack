// @flow
import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { GameListVertical } from "Components/GameListVertical/GameListVertical";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GameListVertical.graphql' or... Remove this comment to see the full error message
import { GameListVerticalQuery } from "./GameListVertical.graphql";

type Props = {
  /** The array of ids to show in a game list. */
  slugs: Array<string>,
};

export const GameListVerticalContainer = ({ slugs }: Props) => {
  const variables = { slugs };
  const { data, loading } = useQuery<
    A.GameListVerticalQuery,
    A.GameListVerticalQueryVariables
  >(GameListVerticalQuery, { variables });

  return <GameListVertical games={data?.gamesBySlugs} loading={loading} />;
};
