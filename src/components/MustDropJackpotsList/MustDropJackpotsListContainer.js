// @flow
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import MustDropJackpotsList from "./MustDropJackpotsList";

const QUERY = gql`
  query gamesListQuery {
    seeMore: getText(
      id: "root:built-pages.top-lists-translations:fields.more_link"
    )
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
          seeMore={data?.seeMore}
        />
      </TrackProvider>
    );
  }
};

export default MustDropJackpotsListContainer;
