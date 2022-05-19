import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import React from "react";
import bridge from "Src/DurandalReactBridge";
import {
  KO_APP_EVENT_PAYMENTS_PERMISSIONS_CHANGED,
  REACT_APP_EVENT_GET_PAYMENTS_PERMISSIONS,
} from "Src/constants";
import { TGetPaymentsPermissionsResponse } from "./payments.api.types";

export const paymentsApi = createApi({
  reducerPath: "paymentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/player/payments/api",
  }),
  endpoints: builder => ({
    getPaymentsPermissions: builder.query<
      TGetPaymentsPermissionsResponse,
      void
    >({
      queryFn: async (arg, queryApi, extraOpts, fetchWithBQ) => {
        const paymentsPermissionsApiEnabled = JSON.parse(
          localStorage.getItem("paymentsPermissionsApiEnabled") ?? "false"
        );

        if (!paymentsPermissionsApiEnabled) {
          return { data: { paymentsPermissionsApiEnabled } };
        }

        const result = await fetchWithBQ("/player-payments-permissions");

        if (result.error) {
          return {
            error: result.error,
          };
        }

        const data = result.data as TGetPaymentsPermissionsResponse;

        return {
          data,
        };
      },
    }),
  }),
});

export function useGetPaymentsPermissionsQuery() {
  const result = paymentsApi.useGetPaymentsPermissionsQuery();
  const emitter = () => {
    if (result.isError) {
      bridge.emit(KO_APP_EVENT_PAYMENTS_PERMISSIONS_CHANGED, { isError: true });
      return;
    }

    if (!result.data) {
      return;
    }

    bridge.emit(KO_APP_EVENT_PAYMENTS_PERMISSIONS_CHANGED, result.data);
  };

  React.useEffect(
    function emitterEffect() {
      emitter();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [result]
  );

  React.useEffect(
    function listenerEffect() {
      bridge.on(REACT_APP_EVENT_GET_PAYMENTS_PERMISSIONS, emitter);

      return () =>
        bridge.off(REACT_APP_EVENT_GET_PAYMENTS_PERMISSIONS, emitter);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [result]
  );

  return result;
}

export function isPaymentMethodAllowedForDeposit({
  id,
  paymentsPermissions,
}: {
  id: string;
  paymentsPermissions: TGetPaymentsPermissionsResponse;
}) {
  if ("paymentsPermissionsApiEnabled" in paymentsPermissions) {
    return true;
  }

  if (!paymentsPermissions.depositAllowed) {
    return false;
  }

  return (
    paymentsPermissions.paymentMethods?.find(
      paymentPermissions => paymentPermissions.paymentMethodId === id
    )?.depositAllowed ?? true
  );
}
