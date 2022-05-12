import * as React from "react";
import * as R from "ramda";
import { useParams } from "@reach/router";
import { useApolloClient } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import * as A from "Types/apollo";
import logger from "Services/logger";
import { injectScript } from "Utils";
import {
  currencySelector,
  playerIdSelector,
  marketSelector,
  isProductionBackendSelector,
} from "Models/handshake";
import type { SDKInterface, BlueRibbonConfig } from "Types/blueRibbonSDK";
import http from "Lib/http";
import { LogLevel } from "Types/blueRibbonSDK";
import {
  blueRibbonHandshakeSelector,
  sdkPotsSelector,
} from "Models/blueribbonJackpots/jackpots.selectors";
import { setSdkPots } from "Models/blueribbonJackpots/jackpots.actions";
import { urls, baseConfig } from "./blueRibbonConsts";
import { GetBlueribbonJackpotConfigByGameSlug } from "./GetBlueribbonJackpotConfigByGameSlug.graphql";

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

let isStartGamesFeedLoading = false; // eslint-disable-line fp/no-let
export function useBlueRibbonSDKAnonymous() {
  const sdk = useBlueRibbonSDK();
  const currency = useSelector(currencySelector);
  const sdkPots = useSelector(sdkPotsSelector);
  const [connectedSDK, setConnectedSDK] = React.useState<SDKInterface>();
  const dispatch = useDispatch();
  React.useEffect(
    function connectBlueRibbonSDK() {
      if (!sdk) {
        return;
      }

      if (R.isEmpty(sdkPots)) {
        sdk.events.on(
          window.BlueRibbon.constants.events.POT_STATE_CHANGED_EVENT,
          eventDetails => dispatch(setSdkPots(eventDetails.jackpotPotState))
        );
      }
      sdk
        .connect({ currency })
        .then(() => {
          if (isStartGamesFeedLoading === true) {
            return;
          }
          isStartGamesFeedLoading = true; // eslint-disable-line fp/no-mutation
          setConnectedSDK(sdk);
          return sdk
            .startGamesFeed({
              games: null,
              gamesMode: window.BlueRibbon.constants.gamesMode.LOBBY,
            })
            .catch(error => {
              logger.error("Blue ribbon startGamesFeed error", error);
            })
            .finally(() => {
              isStartGamesFeedLoading = false; // eslint-disable-line fp/no-mutation
            });
        })
        .catch(err => {
          logger.error("Blue ribbon sdk could not connect", err);
        });
    },
    [currency, dispatch, sdk] // eslint-disable-line react-hooks/exhaustive-deps
  );
  return connectedSDK;
}
export function useBlueRibbonAutoOptIn(jackpotSlug?: string) {
  const [isJackpotGame, setIsJackpotGame] = React.useState(false);
  const currency = useSelector(currencySelector);
  const playerId = useSelector(playerIdSelector);
  const market = useSelector(marketSelector);
  const urlParams = useParams();
  const slug = jackpotSlug || urlParams?.slug;
  const sdk = useBlueRibbonSDK();
  const handshake = useHandshake();
  const [connectedSDK, setConnectedSDK] = React.useState<SDKInterface>();
  const sdkPots = useSelector(sdkPotsSelector);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!sdk || !slug || !handshake) {
      return;
    }
    const gameObj = [
      {
        gameId: slug,
        segments: [market],
      },
    ];

    if (R.isEmpty(sdkPots)) {
      sdk.events.on(
        window.BlueRibbon.constants.events.POT_STATE_CHANGED_EVENT,
        eventDetails => dispatch(setSdkPots(eventDetails.jackpotPotState))
      );
    }

    sdk
      .connect({ currency, playerId: handshake.externalPlayerReference })
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

        return await sdk.startGamesFeed({
          games: gameObj,
          gamesMode: window.BlueRibbon.constants.gamesMode.IN_GAME,
        });
      })
      .then(() => setConnectedSDK(sdk))
      .catch(err => {
        logger.error("Blue ribbon sdk could not opt in to jackpot", err);
      });
  }, [currency, market, playerId, sdk, slug, handshake, dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    sdk: connectedSDK,
    isJackpotGame,
  };
}

export function useHandshake() {
  return useSelector(blueRibbonHandshakeSelector);
}

export function useManualJackpotOptInAndOptOut(
  jackpotSlug: string,
  gameSlug?: string
) {
  const handshake = useHandshake();
  const apolloClient = useApolloClient();

  const changeOptedInStatus = React.useCallback(
    (optedIn: boolean) => {
      if (!gameSlug) {
        return;
      }
      const {
        blueribbonJackpotByGameSlug,
      } = apolloClient.readQuery<A.GetBlueribbonJackpotConfigByGameSlugQuery>({
        query: GetBlueribbonJackpotConfigByGameSlug,
        variables: { gameSlug },
      });

      return apolloClient.writeQuery({
        query: GetBlueribbonJackpotConfigByGameSlug,
        data: {
          blueribbonJackpotByGameSlug: {
            ...blueribbonJackpotByGameSlug,
            optedIn,
          },
        },
        variables: { gameSlug },
      });
    },
    [gameSlug, apolloClient]
  );

  const optIn = React.useCallback(
    (jackpotId: string) => {
      return http.post(urls.optIn, { jackpotId }).then(({ optedIn }) => {
        setRes(curr => ({ ...curr, status: optedIn }));
        changeOptedInStatus(optedIn);
      });
    },
    [changeOptedInStatus]
  );
  const optOut = React.useCallback(
    (jackpotId: string) => {
      return http.post(urls.optOut, { jackpotId }).then(({ optedOut }) => {
        const optedIn = !optedOut; // "optedOut: true" means you opted out
        setRes(curr => ({ ...curr, status: optedIn }));
        changeOptedInStatus(optedIn);
      });
    },
    [changeOptedInStatus]
  );

  const [res, setRes] = React.useState({
    optIn: () => {},
    optOut: () => {},
    status: undefined,
  });

  React.useEffect(() => {
    if (handshake?.jackpots) {
      const chosenJackpot = handshake.jackpots.find(
        x => jackpotSlug === x.jackpotSlug
      );

      if (chosenJackpot) {
        setRes({
          optIn: () => optIn(chosenJackpot.jackpotId),
          optOut: () => optOut(chosenJackpot.jackpotId),
          status: chosenJackpot.optedIn,
        });
      }
    }
  }, [handshake, jackpotSlug, optIn, optOut]);

  return res;
}
