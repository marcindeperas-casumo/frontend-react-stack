// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import logger from "Services/logger";
import { injectScript } from "Utils";
import { currencySelector } from "Models/handshake";
import { urls, operatorId } from "./blueRibbonConsts";

declare var BlueRibbon: any;
export function useBlueRibbonSDK() {
  const [sdk, setSdk] = React.useState();
  const currency = useSelector(currencySelector);

  const blueRibbonConfig = {
    operatorId: operatorId,
    baseServiceUrl: urls.baseService,
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
      return; // SDK already loaded
    }

    injectScript(urls.sdkBundle, "blue-ribbon-sdk")
      .then(() => {
        setSdk(new BlueRibbon.SdkCoreManager(blueRibbonConfig));
      })
      .catch(err => {
        logger.error("Blue ribbon sdk could not be loaded", err);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(
    function connectBlueRibbonSDK() {
      if (!sdk) {
        return;
      }

      sdk
        .connect({ currency })
        .then(() => {
          return sdk.startGamesFeed({
            games: null,
            gamesMode: BlueRibbon.constants.gamesMode.LOBBY,
          });
        })
        .catch(err => {
          logger.error("Blue ribbon sdk could not connect", err);
        });
    },
    [currency, sdk]
  );

  return sdk;
}

type PotState = {
  gameId: string,
  segments?: Array<string>,
  potId: string,
  progressive: number,
  currency: string,
  potStatus: string,
  updateTimestamp: number,
};
type PotStateChangeEvent = {
  jackpotPotState: PotState,
};

export function usePotStateChangeEvent() {
  const sdk = useBlueRibbonSDK();
  const [pots, setPots] = React.useState<{ [string]: PotState }>({});
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
