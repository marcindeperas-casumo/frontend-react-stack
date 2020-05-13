// @flow
import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { useJurisdiction } from "Utils/hooks";
import { PLAYER_CONTACT_SETTINGS_QUERY } from "./PlayerContactSettingsQuery";
import { SettingsNotifications } from "./SettingsNotifications";

export function SettingsNotificationsContainer() {
  const { isDGOJ } = useJurisdiction();
  const { data, error, loading, refetch } = useQuery<
    A.PLAYER_CONTACT_SETTINGS_QUERY,
    _
  >(PLAYER_CONTACT_SETTINGS_QUERY);
  const { t, loading: cmsLoading } = useTranslationsGql({
    subscriptionsTitle:
      "root:player-settings-component:fields.subscriptions_title",
    subscriptionsDescription:
      "root:player-settings-component:fields.subscriptions_description",
    notificationsInGameSessionUpdatesLabel:
      "root:player-settings-component:fields.notifications_ingame_session_updates_label",
    inGameSessionUpdatesOffLabel:
      "root:player-settings-component:fields.in_game_updates_off_label",
    inGameSessionUpdatesFrequencyLabel:
      "root:player-settings-component:fields.in_game_updates_options_label",
  });

  if (loading || cmsLoading) {
    return <SettingsRowListSkeleton count={8} />;
  }
  if (!data || error) {
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SettingsNotifications player={data.player} labels={t} isDGOJ={isDGOJ} />
  );
}
