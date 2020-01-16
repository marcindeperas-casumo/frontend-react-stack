// @flow
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { path } from "ramda";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import MustDropJackpotsList from "./MustDropJackpotsList";

const QUERY = gql`
  query gamesListQuery {
    gamesList(listId: "mustDropJackpotGames") {
      title
      games {
        id
        name
        slug
        logo
        logoBackground
      }
    }
  }
`;

const MustDropJackpotsListContainer = () => {
  const { data, loading } = useQuery(QUERY);
  const getTitle = path(["gamesList", "title"]);
  const getGames = path(["gamesList", "games"]);

  return loading ? null : (
    <TrackProvider
      data={{ [EVENT_PROPS.LOCATION]: "Must Drop Jackpots - Top Lists" }}
    >
      <MustDropJackpotsList
        jackpots={getGames(data)}
        title={getTitle(data)}
        //__FIX__ make sure to bring in CMS field.
        seeMore="..."
      />
    </TrackProvider>
  );
};

export default MustDropJackpotsListContainer;
