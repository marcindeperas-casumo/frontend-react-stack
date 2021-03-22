import { useQuery } from "@apollo/client";
import * as React from "react";
import * as A from "Types/apollo";
import { useTranslations } from "Utils/hooks";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { PLAYER_CONTACT_SETTINGS_QUERY } from "./PlayerContactSettingsQuery";
import { SettingsNotifications } from "./SettingsNotifications";

export interface NotificationTranslations {
  subscriptions_title: string;
  subscriptions_description: string;
  notifications_ingame_session_updates_label: string;
  in_game_updates_off_label: string;
  in_game_updates_options_label: string;
}

export function SettingsNotificationsContainer() {
  const { data, error, loading, refetch } = useQuery<
    A.Player_Contact_Settings_Query,
    A.Player_Contact_Settings_QueryVariables
  >(PLAYER_CONTACT_SETTINGS_QUERY);
  const notificationTranslations = useTranslations<NotificationTranslations>(
    "player-settings-component"
  );

  if ((loading && !data) || !notificationTranslations) {
    return <SettingsRowListSkeleton count={8} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SettingsNotifications
      player={data.player}
      labels={notificationTranslations}
    />
  );
}
