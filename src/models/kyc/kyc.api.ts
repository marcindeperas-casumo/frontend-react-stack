import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { shell, common } from "@casumo/frontend-kyc/dist/api/endpoints";
import {
  TVerificationItemKey,
  TVerificationItemBasics,
} from "@casumo/frontend-kyc/dist/models/verification-item.types";
import { TSurveyAnswer } from "@casumo/frontend-kyc/dist/models/survey.types";
import { TVerificationItemStateSetEvent } from "@casumo/frontend-kyc/dist/api/websockets.types";
import {
  TRedirectionURLResponse,
  TRedirectionURLRequest,
  TVerificationItemsResponse,
} from "@casumo/frontend-kyc/dist/api/endpoints.types";
import { CHANNELS } from "Models/cometd";
import cometd from "Models/cometd/cometd.service";
import { TEvent } from "Models/cometd/cometd.types";
import logger from "Services/logger";

export type TFormAnswerSubmitResponse = {};

export type TFormAnswerSubmitRequest = {
  playerId: string;
  key: TVerificationItemKey;
  answers: Array<TSurveyAnswer>;
};

const updateItems = (
  items: Array<TVerificationItemBasics>,
  updates: TVerificationItemBasics
): void => {
  const item = items.find(i => i.type === updates.type);

  /* eslint-disable fp/no-mutation, fp/no-mutating-methods */
  if (item) {
    items = items.map(i => {
      if (i.type === updates.type) {
        i.state = updates.state;
        i.userMessages = updates.userMessages || [];

        return i;
      } else {
        return i;
      }
    });
  } else {
    items.push({
      ...updates,
      userMessages: updates.userMessages || [],
    });
  }
  /* eslint-enable fp/no-mutation, fp/no-mutating-methods */
};

export const kycApi = createApi({
  reducerPath: "kycApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/${shell.service}/`,
  }),
  endpoints: builder => ({
    getVerificationItems: builder.query<
      TVerificationItemsResponse,
      string | undefined
    >({
      query: () => shell.GET.verificationItems,
      onCacheEntryAdded: async (
        playerId,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) => {
        const channel = `${CHANNELS.PLAYER}/${playerId}`;

        const listener = (event: TEvent) => {
          if (event.data?.kycVerificationItemStateSet) {
            const payload = event.data
              .kycVerificationItemStateSet as TVerificationItemStateSetEvent;
            const { key, state, userMessages } = payload;
            const { type, paymentMethodId } = key;

            updateCachedData(items =>
              updateItems(items, {
                state,
                userMessages,
                type,
                paymentMethodId,
                stickyUserMessages: [],
                formAnswers: [],
                awaitingDocument: false,
              })
            );
          }
        };

        try {
          await cacheDataLoaded;

          cometd.subscribe(channel, listener);

          await cacheEntryRemoved;
        } catch (e) {
          logger.warning(`kycApi: ${e}`);
        } finally {
          cometd.unsubscribe(channel, listener);
        }
      },
    }),
  }),
});

export const kycCommonApi = createApi({
  reducerPath: "kycCommonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `/${common.service}/`,
  }),
  endpoints: builder => ({
    getRedirectionURL: builder.mutation<
      TRedirectionURLResponse,
      TRedirectionURLRequest
    >({
      query: body => ({
        url: common.POST.redirectionURL,
        method: "POST",
        body,
      }),
    }),
    submitSurveyAnswers: builder.mutation<
      TFormAnswerSubmitResponse,
      TFormAnswerSubmitRequest
    >({
      query: body => ({
        url: common.POST.submitVerificationItemFormAnswers,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useGetVerificationItemsQuery } = kycApi;

export const { useGetRedirectionURLMutation, useSubmitSurveyAnswersMutation } =
  kycCommonApi;
