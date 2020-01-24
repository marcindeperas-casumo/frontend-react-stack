// @flow
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
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
        backgroundImage
      }
    }
  }
`;

const MustDropJackpotsListContainer = () => {
  const { data, loading } = useQuery(QUERY);
  if (loading) {
    return null;
  }

  if (data) {
    return (
      <TrackProvider
        data={{ [EVENT_PROPS.LOCATION]: "Must Drop Jackpots - Top Lists" }}
      >
        <MustDropJackpotsList
          jackpots={data?.gamesList?.games}
          name={data?.gamesList?.name}
          //__FIX__ make sure to add in CMS field.
          seeMore="..."
        />
      </TrackProvider>
    );
  }
};

export default MustDropJackpotsListContainer;
