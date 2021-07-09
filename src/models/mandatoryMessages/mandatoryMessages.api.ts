import { useSelector } from "react-redux";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  isApplicationHandshakeLoaded,
  mandatoryMessagesSelector,
} from "Models/handshake";
import { TMandatoryMessage } from "./mandatoryMessages.types";

export const mandatoryMessagesApi = createApi({
  reducerPath: "mandatoryMessagesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/player/mandatory-messages/api" }),
  endpoints: builder => ({
    getMandatoryMessages: builder.query<Array<TMandatoryMessage>, void>({
      keepUnusedDataFor: 1000,
      queryFn: (arg, api, extraOptions) => ({
        data: mandatoryMessagesSelector(api.getState()),
      }),
    }),
  }),
});

const {
  useGetMandatoryMessagesQuery: useGetMandatoryMessagesQueryBase,
} = mandatoryMessagesApi;

export const useGetMandatoryMessagesQuery = () => {
  const isHandshakeLoaded = useSelector(isApplicationHandshakeLoaded);

  return useGetMandatoryMessagesQueryBase(null, {
    skip: !isHandshakeLoaded,
  });
};
