import * as React from "react";
import { useSelector } from "react-redux";
import { countrySelector } from "Models/handshake";
import { getGameInfo, TGameInfo } from "Src/api/api.games";
import { getPlatform } from "Utils";
import { useJurisdiction } from "./useJurisdiction";

export function useGameInfo(slug: string) {
  const playerCountry = useSelector(countrySelector);
  const { jurisdiction } = useJurisdiction();
  const platform = getPlatform();

  const getGameInfoHooked = React.useCallback(
    async () => await getGameInfo(slug, playerCountry, jurisdiction, platform),
    [slug]
  );

  const [gameInfo, setGameInfo] = React.useState<TGameInfo | undefined>(
    undefined
  );

  React.useEffect(() => {
    (async function () {
      try {
        const game = await getGameInfoHooked();
        setGameInfo(game);
      } catch {
        // 404: the game is not available for current params
        setGameInfo(undefined);
      }
    })();
  }, [slug, getGameInfoHooked]);

  return {
    gameInfo,
    isGameEmbedded: Boolean(gameInfo),
  };
}
