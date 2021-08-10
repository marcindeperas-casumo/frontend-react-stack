import * as React from "react";
import { useSelector } from "react-redux";
import logger from "Services/logger";
import {
  isApplicationHandshakeLoaded,
  mandatoryMessagesSelector,
  playerIdSelector,
} from "Models/handshake";
import cometd from "Models/cometd/cometd.service";
import { CHANNELS } from "Models/cometd";
import {
  TMandatoryMessage,
  TCometdMandatoryMessageReceived,
} from "./mandatoryMessages.types";
import { mandatoryMessagesApi } from "./mandatoryMessages.api";
import { reducerPath } from "./mandatoryMessages.constants";

export const getMandatoryMessagesApi = mandatoryMessagesApi.injectEndpoints({
  endpoints: builder => ({
    getMandatoryMessages: builder.query<Array<TMandatoryMessage>, void>({
      keepUnusedDataFor: 60 * 60,
      queryFn: (arg, api, extraOptions) => ({
        data: mandatoryMessagesSelector(api.getState()),
      }),
      onCacheEntryAdded: async (
        arg,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved, getState }
      ) => {
        const playerId = playerIdSelector(getState());
        const channel = `${CHANNELS.PLAYER}/${playerId}`;
        const listener = (event: TCometdMandatoryMessageReceived) => {
          if (!event.data?.mandatoryMessageReceived) {
            return;
          }

          const {
            data: {
              mandatoryMessageReceived: { message },
            },
          } = event;

          updateCachedData(draft => {
            if (draft.find(draftMessage => draftMessage.id === message.id)) {
              return;
            }

            draft.push(message); // eslint-disable-line fp/no-mutating-methods
          });
        };

        try {
          await cacheDataLoaded;

          cometd.subscribe(channel, listener);

          await cacheEntryRemoved;
        } catch (e) {
          logger.warning(`${reducerPath}: ${e}`);
        } finally {
          cometd.unsubscribe(channel, listener);
        }
      },
    }),
  }),
});

const { useLazyGetMandatoryMessagesQuery } = getMandatoryMessagesApi;

export const useGetMandatoryMessagesQuery = () => {
  const isHandshakeLoaded = useSelector(isApplicationHandshakeLoaded);

  const [fetch, result] = useLazyGetMandatoryMessagesQuery();

  React.useEffect(() => {
    if (isHandshakeLoaded) {
      fetch();
    }
  }, [isHandshakeLoaded, fetch]);

  return result;
};
