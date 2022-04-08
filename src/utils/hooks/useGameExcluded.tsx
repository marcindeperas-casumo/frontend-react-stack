import { useState, useEffect } from "react";
import logger from "Services/logger";
import { getGameExcludedForPlayer } from "Src/api/api.gameExclusion";

export const useGameExcluded = () => {
  const [gameExcluded, setGameExcluded] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const responseData = await getGameExcludedForPlayer();
        setGameExcluded(responseData);
      } catch (e) {
        logger.error("Game launch failed", e);
      }
    })();

    return () => {
      setGameExcluded(null);
    };
  }, [gameExcluded]);

  return gameExcluded;
};
