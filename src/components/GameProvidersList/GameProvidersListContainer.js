// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { propOr, isEmpty } from "ramda";
import gql from "graphql-tag";
import { GameProvidersList } from "./GameProvidersList";
import GameProvidersListSkeleton from "./GameProvidersListSkeleton";

const QUERY = gql`
  query GameStudiosQuery {
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

  if (isEmpty(gameStudios)) {
    if (loading) {
      return <GameProvidersListSkeleton />;
    }

    return null;
  }

  return <GameProvidersList title={title} gameStudios={gameStudios} />;
};
