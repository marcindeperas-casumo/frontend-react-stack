// @flow
import * as React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { useFetch, useJurisdiction } from "Utils/hooks";
import cometd from "Models/cometd/cometd.service";
import {
  CHANNELS as cometdChannels,
  MESSAGES as cometdMessages,
} from "Models/cometd";
import { playerIdSelector } from "Models/handshake";
import { gglRealityCheckUpdateAction } from "./fiveMinuteBreak.actions";
import { RC_STATE_URL } from "./fiveMinuteBreak.constants";

export function useFiveMinuteBreakRealityCheck() {
  const { isGGL } = useJurisdiction();
  const dispatch = useDispatch();
  const playerId = useSelector(playerIdSelector, shallowEqual);
  const channel = `${cometdChannels.PLAYER}/${playerId}`;
  const { response: initialState } = useFetch(RC_STATE_URL);

  React.useEffect(() => {
    if (initialState) {
      dispatch(gglRealityCheckUpdateAction(initialState));
    }
  }, [dispatch, initialState]);

  const subscriptionHandler = ({ data }) => {
    if (cometdMessages.GGL_REALITY_CHECK_SESSION_STARTED in data) {
      dispatch(
        gglRealityCheckUpdateAction({
          activeRCSession: {
            startedTime: Date.now(),
            expiringTime: Date.now() + 60000,
          },
          //data[cometdMessages.GGL_REALITY_CHECK_SESSION_STARTED],
          activeRCBreak: null,
        })
      );
      setTimeout(() => {
        dispatch(
          gglRealityCheckUpdateAction({
            activeRCBreak: {
              startedTime: Date.now(),
              expiringTime: Date.now() + 60000,
            },
            //data[cometdMessages.GGL_REALITY_CHECK_SESSION_STARTED],
            activeRCSession: null,
          })
        );

        setTimeout(() => {
          dispatch(
            gglRealityCheckUpdateAction({
              activeRCSession: null,
              activeRCBreak: null,
            })
          );
        }, 60000);
      }, 60000);
    } else if (cometdMessages.GGL_REALITY_CHECK_BREAK_STARTED in data) {
      dispatch(
        gglRealityCheckUpdateAction({
          activeRCSession: null,
          activeRCBreak: data[cometdMessages.GGL_REALITY_CHECK_BREAK_STARTED],
        })
      );
    } else if (cometdMessages.GGL_REALITY_CHECK_BREAK_ENDED in data) {
      dispatch(
        gglRealityCheckUpdateAction({
          activeRCSession: null,
          activeRCBreak: null,
        })
      );
    }
  };

  React.useEffect(() => {
    if (!isGGL) {
      return;
    }

    cometd.subscribe(channel, subscriptionHandler);

    return () => cometd.unsubscribe(channel, subscriptionHandler);
  }, [channel, isGGL]); // eslint-disable-line react-hooks/exhaustive-deps
}
