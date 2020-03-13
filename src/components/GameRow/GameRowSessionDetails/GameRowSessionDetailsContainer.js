// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { launchGame } from "Services/LaunchGameService";
import { GameRow } from "../GameRow";
import { GameRowText } from "../GameRowText";
import { GameRowSessionDetailsQuery } from "./GameRowSessionDetails.graphql";

type Props = {
  /** The game slug. */
  slug: string,
};

export const GameRowSessionDetailsContainer = ({ slug }: Props) => {
  const { data, loading } = useQuery<
    A.GameListVerticalQuery,
    A.GameListVerticalQueryVariables
  >(GameRowSessionDetailsQuery, {
    variables: {
      slugs: [slug],
    },
  });
  const game = data?.gamesBySlugs[0];

  if (loading || !game) {
    return null;
  }

  return (
    <GameRow
      game={game}
      onLaunchGame={() => launchGame({ slug: game.slug })}
      renderText={() => <GameRowText name={game.name} />}
    />
  );
};
