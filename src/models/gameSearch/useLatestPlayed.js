// @flow
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameListGamesSelector } from "Models/schema";
import { initFetchLatestPlayedGames } from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

type UseLatestPlayedType = {
  /** Ids of latest played games, as seen in Latest Played Game List */
  latestPlayedIds: Array<string>,
};

export function useLatestPlayed(): UseLatestPlayedType {
  const dispatch = useDispatch();
  const latestPlayedIds = useSelector(
    gameListGamesSelector(GAME_LIST_IDS.LATEST_PLAYED)
  );

  useEffect(() => {
    dispatch(initFetchLatestPlayedGames());
  }, [dispatch]);

  return {
    latestPlayedIds,
  };
}
