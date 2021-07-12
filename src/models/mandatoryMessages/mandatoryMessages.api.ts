import * as React from "react";
import { useSelector } from "react-redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  isApplicationHandshakeLoaded,
  mandatoryMessagesSelector,
} from "Models/handshake";
import { TMandatoryMessage } from "./mandatoryMessages.types";

export const mandatoryMessagesApi = createApi({
  reducerPath: "mandatoryMessagesApi",
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
