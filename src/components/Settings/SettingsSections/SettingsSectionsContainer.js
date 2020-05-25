// @flow
import React from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { appManualLogoutInit } from "Models/app";
import { SettingsSections } from "Components/Settings/SettingsSections/SettingsSections";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import PLAYER_LOGIN_HISTORY_QUERY from "./PlayerLoginHistoryQuery.graphql";

export function SettingsSectionsContainer() {
  const playerLoginHistory = useQuery<A.PLAYER_LOGIN_HISTORY_QUERY, _>(
    PLAYER_LOGIN_HISTORY_QUERY
  );
  const labels = useTranslationsGql({
    accountDetailsTitle:
      "root:player-settings-component:fields.account_details_title",
    accountDetailsDescription:
      "root:player-settings-component:fields.account_details_description",
    notificationsTitle:
      "root:player-settings-component:fields.notifications_title",
    notificationsDescription:
      "root:player-settings-component:fields.notifications_description",
    currentSessionMessage:
      "root:player-settings-component:fields.current_session_length",
    lastSessionMessage:
      "root:player-settings-component:fields.last_session_message",
    accountActivity: "root:player-settings-component:fields.account_activity",
    logout: "root:player-settings-component:fields.logout",
  });
  const dispatch = useDispatch();

  if (playerLoginHistory.loading || labels.loading) {
    return <SettingsRowListSkeleton count={2} />;
  }
  if (!playerLoginHistory.data || playerLoginHistory.error) {
    return <ErrorMessage retry={() => playerLoginHistory.refetch()} />;
  }

  return (
    <SettingsSections
      playerLoginHistory={playerLoginHistory.data}
      labels={labels.t}
      logout={() => dispatch(appManualLogoutInit())}
    />
  );
}
