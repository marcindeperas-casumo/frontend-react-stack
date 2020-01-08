// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { propOr } from "ramda";
import gql from "graphql-tag";
import GameProvidersList from "./GameProvidersList";

const QUERY = gql`
  query gameStudiosQuery {
    gameStudios {
      id
      url
      background
      logo
      slug
      name
    }
  }
`;

type Props = {
  title: string,
};

export const GameProvidersListContainer = ({ title }: Props) => {
  const { data, loading } = useQuery(QUERY);
  const gameStudios = propOr([], "gameStudios", data);

  return (
    <GameProvidersList title={title} isLoaded={!loading} items={gameStudios} />
  );
};
