// @flow
import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { SetMarketingCrossSellSubscription } from "./Mutations.graphql";
import { SettingsNotificationsSubscribedToMarketingCrossSellQuery } from "./MarketingCrossSellSubscription.graphql";
import { SettingsNotificationsSubscriptionRow as SubscriptionRow } from "./SettingsNotificationsSubscriptionRow";
import { onMutationError } from "./SettingsNotifications.utils";

export function MarketingCrossSellSubscriptionContainer() {
  const { t, loading: cmsLoading } = useTranslationsGql({
    subscriptionsMarketingCrossSellLabel:
      "root:player-settings-component:fields.subscriptions_cross_sell",
  });
  const [setMarketingCrossSellSubscription] = useMutation<
    A.SetMarketingCrossSellSubscription,
    A.SetMarketingCrossSellSubscriptionVariables
  >(SetMarketingCrossSellSubscription, {
    onError: onMutationError,
    refetchQueries: [
      { query: SettingsNotificationsSubscribedToMarketingCrossSellQuery },
    ],
  });
  const { data, error, loading, refetch } = useQuery<
    A.SettingsNotificationsSubscribedToMarketingCrossSellQuery,
    _
  >(SettingsNotificationsSubscribedToMarketingCrossSellQuery);

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={1} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SubscriptionRow
      label={t.subscriptionsMarketingCrossSellLabel}
      isEnabled={
        data.player.details.contactSettings.subscribedToMarketingCrossSell
      }
      onChange={value =>
        setMarketingCrossSellSubscription({
          variables: { input: { on: value } },
          optimisticResponse: {
            setMarketingCrossSellSubscription: value,
          },
        })
      }
    />
  );
}
