// @flow
import React from "react";
import { useQuery } from "react-apollo";
import * as A from "Types/apollo";
import { SettingsAccountDetails } from "Components/Settings/SettingsAccountDetails/SettingsAccountDetails";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import PLAYER_SETTINGS_LABELS_QUERY from "./PlayerSettingsLabelsQuery.graphql";
import { PLAYER_SETTINGS_QUERY } from "./PlayerSettingsQuery.graphql";

export function SettingsAccountDetailsContainer() {
  const labels = useQuery<A.PLAYER_SETTINGS_LABELS_QUERY>(
    PLAYER_SETTINGS_LABELS_QUERY
  );
  const settings = useQuery<A.PLAYER_SETTINGS_QUERY>(PLAYER_SETTINGS_QUERY);

  if (labels.loading || settings.loading) {
    return <SettingsRowListSkeleton count={6} />;
  }
  if (settings.error) {
    return <ErrorMessage retry={() => settings.refetch()} />;
  }
  if (labels.error) {
    return <ErrorMessage retry={() => labels.refetch()} />;
  }

  return (
    <SettingsAccountDetails
      labels={labels.data}
      player={settings.data.player}
      refetchSettings={settings.refetch}
    />
  );
}
