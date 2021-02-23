// @flow
import * as React from "react";
import * as R from "ramda";
import { useParams } from "@reach/router";
import { useSelector } from "react-redux";
import logger from "Services/logger";
import { injectScript } from "Utils";
import {
  currencySelector,
  playerIdSelector,
  isProductionBackendSelector,
} from "Models/handshake";
import { urls, baseConfig, type JackpotStatus } from "./blueRibbonConsts";

declare var BlueRibbon: any;

let sdkMutable; // eslint-disable-line fp/no-let

function useBlueRibbonConfig() {
  const isProductionBackend = useSelector(isProductionBackendSelector);

  if (isProductionBackend) {
    return baseConfig.production;
  }

  return baseConfig.development;
}

export function useBlueRibbonSDK() {
  const [sdk, setSdk] = React.useState();
  const config = useBlueRibbonConfig();

  const blueRibbonConfig = {
    ...config,
    loginAnonymousPlayer: () => {
      return fetch(urls.loginAnonymous, { method: "POST" }).then(raw =>
        raw.json()
      );
    },
    loginAuthenticatedPlayer: () => {
      return fetch(urls.loginAuthenticated, { method: "POST" }).then(raw =>
        raw.json()
      );
    },
  };

  React.useEffect(function fetchBlueRibbonSDK() {
    if (window.BlueRibbon) {
      // SDK already loaded
      setSdk(sdkMutable);
      return;
    }

    injectScript(urls.sdkBundle, "blue-ribbon-sdk")
      .then(() => {
        sdkMutable = new BlueRibbon.SdkCoreManager(blueRibbonConfig); // eslint-disable-line fp/no-mutation
        setSdk(sdkMutable);
      })
      .catch(err => {
        logger.error("Blue ribbon sdk could not be loaded", err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return sdk;
}

export function useBlueRibbonSDKAnonymous() {
  const sdk = useBlueRibbonSDK();
  const currency = useSelector(currencySelector);
  const [connectedSDK, setConnectedSDK] = React.useState();

  React.useEffect(
    function connectBlueRibbonSDK() {
      if (!sdk) {
        return;
      }

      sdk
        .connect({ currency })
        .then(() => {
          setConnectedSDK(sdk);

          return sdk.startGamesFeed({
            games: null,
            gamesMode: BlueRibbon.constants.gamesMode.LOBBY,
          });
        })
        .catch(err => {
          logger.error("Blue ribbon sdk could not connect", err);
        });

      return sdk.reset;
    },
    [currency, sdk]
  );

  return connectedSDK;
}

export function useBlueRibbonAutoOptIn() {
  const [isJackpotGame, setIsJackpotGame] = React.useState(false);
  const currency = useSelector(currencySelector);
  const playerId = useSelector(playerIdSelector);
  const urlParams = useParams();
  const slug = urlParams?.slug;
  const sdk = useBlueRibbonSDK();
  const [connectedSDK, setConnectedSDK] = React.useState();

  React.useEffect(() => {
    if (!sdk || !slug) {
      return;
    }

    const gameObj = { gameId: slug };

    fetch(urls.handshake)
      .then(raw => raw.json())
      .then(({ externalPlayerReference }) =>
        sdk.connect({ currency, playerId: externalPlayerReference })
      )
      .then(async () => {
        const res: {
          gamesDetails: Array<{
            gameId: string,
            jackpotGameId: string,
          }>,
        } = await sdk.ticker.getGameDetailsByGameIds([gameObj]);
        const jackpotGameId = R.path(["gamesDetails", 0, "jackpotGameId"], res);
        if (!jackpotGameId) {
          return;
        }
        setIsJackpotGame(true);

        return await sdk.startGamesFeed({
          games: [gameObj],
          gamesMode: BlueRibbon.constants.gamesMode.IN_GAME,
        });
      })
      .then(() => setConnectedSDK(sdk))
      .catch(err => {
        logger.error("Blue ribbon sdk could not opt in to jackpot", err);
      });

    return sdk.reset;
  }, [currency, playerId, sdk, slug]);

  return {
    sdk: connectedSDK,
    isJackpotGame,
  };
}

type PotState = {
  gameId: string,
  segments?: Array<string>,
  potId: string,
  progressive: number,
  currency: string,
  potStatus: JackpotStatus,
  updateTimestamp: number,
};
type PotStateChangeEvent = {
  jackpotPotState: PotState,
};

export function usePotStateChangeEvent() {
  const [sdk, setSdk] = React.useState(sdkMutable);
  const [pots, setPots] = React.useState<{ [string]: PotState }>({});

  React.useEffect(() => {
    if (sdk) {
      return;
    }

    const intervalId = setInterval(() => {
      if (sdkMutable) {
        setSdk(sdkMutable);
        clearInterval(intervalId);
      }
    }, 200);

    return () => clearInterval(intervalId);
  }, [sdk]);

  React.useEffect(() => {
    if (!sdk) {
      return;
    }

    sdk.events.on(
      BlueRibbon.constants.events.POT_STATE_CHANGED_EVENT,
      (x: PotStateChangeEvent) => {
        setPots(oldPots => ({
          ...oldPots,
          [x.jackpotPotState.potId]: x.jackpotPotState,
        }));
      }
    );
  }, [sdk]);

  return pots;
}
