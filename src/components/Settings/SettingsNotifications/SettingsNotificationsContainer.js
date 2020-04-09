// @flow
import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { useJurisdiction } from "Utils/hooks";
import { PLAYER_CONTACT_SETTINGS_QUERY } from "./PlayerContactSettingsQuery";
import NOTIFICATIONS_LABELS_QUERY from "./SettingsNotificationsLabelsQuery.graphql";
import { SettingsNotifications } from "./SettingsNotifications";

export function SettingsNotificationsContainer() {
  const { isDGOJ } = useJurisdiction();
  const playerContactSettings = useQuery<A.PLAYER_CONTACT_SETTINGS_QUERY, _>(
    PLAYER_CONTACT_SETTINGS_QUERY
  );
  const labels = useQuery<A.NOTIFICATIONS_LABELS_QUERY, _>(
    NOTIFICATIONS_LABELS_QUERY
  );

  if (playerContactSettings.loading || labels.loading) {
    return <SettingsRowListSkeleton count={8} />;
  }
  if (!playerContactSettings.data || playerContactSettings.error) {
    return <ErrorMessage retry={() => playerContactSettings.refetch()} />;
  }
  if (!labels.data || labels.error) {
    return <ErrorMessage retry={() => labels.refetch()} />;
  }

  return (
    <SettingsNotifications
      player={playerContactSettings.data.player}
      labels={labels.data}
      isDGOJ={isDGOJ}
    />
  );
}
