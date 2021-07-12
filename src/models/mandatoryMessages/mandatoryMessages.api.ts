import * as React from "react";
import { useSelector } from "react-redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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

const reducerPath = "mandatoryMessagesApi";

export const mandatoryMessagesApi = createApi({
  reducerPath,
  baseQuery: fetchBaseQuery({
    baseUrl: "/player/mandatory-messages/api",
    prepareHeaders: headers => {
      headers.set("Content-Type", "application/json");

      return headers;
    },
  }),
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
        } catch (e) {
          logger.warning(`${reducerPath}: ${e}`);
        }

        await cacheEntryRemoved;

        cometd.unsubscribe(channel, listener);
      },
    }),
    markAsRead: builder.mutation<void, string>({
      query: messageId => ({
        url: `/mark-as-read/${messageId}`,
        method: "PUT",
      }),
      onQueryStarted: async (messageId, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(
          mandatoryMessagesApi.util.updateQueryData(
            "getMandatoryMessages",
            undefined,
            draft => {
              return draft.filter(message => message.id !== messageId);
            }
          )
        );
      },
    }),
  }),
});

const { useLazyGetMandatoryMessagesQuery } = mandatoryMessagesApi;

export const { useMarkAsReadMutation } = mandatoryMessagesApi;

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
