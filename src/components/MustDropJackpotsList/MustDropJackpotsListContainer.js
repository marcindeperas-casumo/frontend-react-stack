// @flow
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { path } from "ramda";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import MustDropJackpotsList from "./MustDropJackpotsList";

//__FIX__ this query is missing the following information:
// slug: `built-pages.top-lists-${marketSelector(state)}`,
// field: "more_link",

const QUERY = gql`
  query gamesListQuery {
    gamesList(listId: "mustDropJackpotGames") {
      name
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
  const getName = path(["gamesList", "name"]);
  const getGames = path(["gamesList", "games"]);

  return loading ? null : (
    <TrackProvider
      data={{ [EVENT_PROPS.LOCATION]: "Must Drop Jackpots - Top Lists" }}
    >
      <MustDropJackpotsList
        jackpots={getGames(data)}
        name={getName(data)}
        //__FIX__ make sure to add in CMS field.
        seeMore="..."
      />
    </TrackProvider>
  );
};

export default MustDropJackpotsListContainer;
