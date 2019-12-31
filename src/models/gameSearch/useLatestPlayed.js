// @flow
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gameListGamesSelector } from "Models/schema";
import {
  initFetchLatestPlayedGames,
  type UseLatestPlayedType,
} from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

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
