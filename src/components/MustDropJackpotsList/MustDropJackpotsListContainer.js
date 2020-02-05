// @flow
import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { EVENT_PROPS } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import MustDropJackpotsList from "./MustDropJackpotsList";

const QUERY = gql`
  query MustDropJackpotGamesListQuery {
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
  const { data } = useQuery(QUERY);

  if (data && data.gamesList && data.gamesList.games) {
    return (
      <TrackProvider
        data={{ [EVENT_PROPS.LOCATION]: "Must Drop Jackpots - Top Lists" }}
      >
        <MustDropJackpotsList
          jackpots={data.gamesList.games}
          name={data.gamesList.name}
          seeMore={data?.seeMore}
        />
      </TrackProvider>
    );
  }

  return null;
};

export default MustDropJackpotsListContainer;
