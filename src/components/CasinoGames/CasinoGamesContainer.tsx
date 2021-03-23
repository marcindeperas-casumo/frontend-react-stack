import React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import { useFetchMore } from "./hooks/useFetchMore";
import { CasinoGames } from "./CasinoGames";
import { GetGamesRTP } from "./GetGamesRTP.graphql";
import type { TCasinoGamesTranslations } from "./Constants";
import { gameListRTPLimit } from "./Constants";
import "./CasinoGames.scss";

export const CasinoGamesContainer = () => {
  const [offset, setOffset] = React.useState(0);

  const t = useTranslations<TCasinoGamesTranslations>("game-categories");
  const categoriesContent = useTranslations("game-categories", true);
  const query = "categories=SLOT_MACHINE";

  const { data, loading, fetchMore } = useQuery<
    A.GetGamesRtpQuery,
    A.GetGamesRtpQueryVariables
  >(GetGamesRTP, {
    variables: {
      query,
      offset,
      limit: gameListRTPLimit,
    },
  });

  const fetchMoreRows = useFetchMore({ fetchMore, setOffset, offset });

  if (loading) {
    const rootElement = document.getElementById(ROOT_SCROLL_ELEMENT_ID);
    rootElement.scrollTo(0, 0);

    return (
      <div className="c-casinogames-loader">
        <h3 className="u-text-align-center">Cargando resultados</h3>
      </div>
    );
  }

  if (!data?.getGamesPaginated) {
    return null;
  }

  const { games, gamesCount } = data.getGamesPaginated;

  return (
    <CasinoGames
      categoriesContent={categoriesContent}
      t={t}
      games={games}
      fullGamesCount={gamesCount}
      fetchMore={fetchMoreRows}
    />
  );
};
