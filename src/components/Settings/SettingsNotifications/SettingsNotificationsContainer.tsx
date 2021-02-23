// @flow
import * as React from "react";
import { useQuery } from "@apollo/client";
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
    A.PLAYER_CONTACT_SETTINGS_QUERY,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
    _
  >(PLAYER_CONTACT_SETTINGS_QUERY);
  const notificationTranslations = useTranslations<NotificationTranslations>(
    "player-settings-component"
  );

  if (loading || !notificationTranslations) {
    return <SettingsRowListSkeleton count={8} />;
  }
  if (!data || error) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Promise<ApolloQueryResult<PLAYER_CONTACT_SET... Remove this comment to see the full error message
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SettingsNotifications
      player={data.player}
      labels={notificationTranslations}
    />
  );
}
