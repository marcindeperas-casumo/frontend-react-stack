import * as React from "react";
import * as R from "ramda";
import { useParams } from "@reach/router";
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client";
import logger from "Services/logger";
import { injectScript } from "Utils";
import {
  currencySelector,
  playerIdSelector,
  marketSelector,
  isProductionBackendSelector,
} from "Models/handshake";
import * as A from "Types/apollo";
import type {
  SDKInterface,
  BlueRibbonConfig,
  JackpotState,
} from "Types/blueRibbonSDK";
import { LogLevel } from "Types/blueRibbonSDK";
import { urls, baseConfig } from "./blueRibbonConsts";
import type { JackpotStatus, ComposedJackpot } from "./blueRibbonConsts";
import { GetJackpotConfigForWidget } from "./GetJackpotConfigForWidget.graphql";

let sdkMutable: SDKInterface | null; // eslint-disable-line fp/no-let

function useBlueRibbonConfig() {
  const isProductionBackend = useSelector(isProductionBackendSelector);

  if (isProductionBackend) {
    return baseConfig.production;
  }

  return baseConfig.development;
}
export function useBlueRibbonSDK() {
  const [sdk, setSdk] = React.useState<SDKInterface>();
  const config = useBlueRibbonConfig();
  const blueRibbonConfig: BlueRibbonConfig = {
    ...config,
    logLevel: LogLevel.debug,
    withOverlays: false,
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
        sdkMutable = new window.BlueRibbon.SdkCoreManager(blueRibbonConfig); // eslint-disable-line fp/no-mutation
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
  const [connectedSDK, setConnectedSDK] = React.useState<SDKInterface>();
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
            gamesMode: window.BlueRibbon.constants.gamesMode.LOBBY,
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
  const market = useSelector(marketSelector);
  const urlParams = useParams();
  const slug = urlParams?.slug;
  const sdk = useBlueRibbonSDK();
  const [connectedSDK, setConnectedSDK] = React.useState<SDKInterface>();
  React.useEffect(() => {
    if (!sdk || !slug) {
      return;
    }
    const gameObj = [
      {
        gameId: slug,
        segments: [market],
      },
    ];

    fetch(urls.handshake)
      .then(raw => raw.json())
      .then(({ externalPlayerReference }) =>
        sdk.connect({ currency, playerId: externalPlayerReference })
      )
      .then(async () => {
        const res = await sdk.operatorGames.getOperatorGamesMatchDetailsByGameIds(
          gameObj
        );
        const jackpotGameId = R.path(
          ["matchedOperatorGames", 0, "jackpotGameId"],
          res
        );
        if (!jackpotGameId) {
          return;
        }
        setIsJackpotGame(true);

        return sdk.startGamesFeed({
          games: gameObj,
          gamesMode: window.BlueRibbon.constants.gamesMode.IN_GAME,
        });
      })
      .then(() => setConnectedSDK(sdk))
      .catch(err => {
        logger.error("Blue ribbon sdk could not opt in to jackpot", err);
      });
    return sdk.reset;
  }, [currency, market, playerId, sdk, slug]);
  return {
    sdk: connectedSDK,
    isJackpotGame,
  };
}
export function usePotStateChangeEvent() {
  const [sdk, setSdk] = React.useState(sdkMutable);
  const [pots, setPots] = React.useState<{
    [s: string]: JackpotState;
  }>({});
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
      window.BlueRibbon.constants.events.POT_STATE_CHANGED_EVENT,
      eventDetails => {
        setPots(oldPots => ({
          ...oldPots,
          [eventDetails.jackpotPotState.potId]: eventDetails.jackpotPotState,
        }));
      }
    );
  }, [sdk]);
  return pots;
}

export const useComposedJackpotConfigData = ({
  jackpotSlug,
}: {
  jackpotSlug: string;
}) => {
  const [
    composedJackpot,
    setComposedJackpot,
  ] = React.useState<ComposedJackpot>();
  useBlueRibbonSDKAnonymous();
  const sdkPots = usePotStateChangeEvent();

  const { data, loading } = useQuery<
    A.GetJackpotConfigForWidgetQuery,
    A.GetJackpotConfigForWidgetQueryVariables
  >(GetJackpotConfigForWidget, {
    variables: {
      slug: jackpotSlug,
    },
  });

  React.useEffect(() => {
    if (!loading && data) {
      const jackpot = data.blueribbonJackpot;
      setComposedJackpot({
        ...jackpot,
        pots: jackpot.pots.map(pot => ({
          ...pot,
          value: sdkPots[pot.externalId]?.progressive,
          status: sdkPots[pot.externalId]?.potStatus as JackpotStatus,
        })),
      });
    }
  }, [sdkPots, data, loading]);

  return {
    composedJackpot,
  };
};
