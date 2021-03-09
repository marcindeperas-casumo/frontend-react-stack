import { useQuery } from "@apollo/client";
import React from "react";
import { useDispatch } from "react-redux";
import * as A from "Types/apollo";
import { appManualLogoutInit } from "Models/app";
import { SettingsSections } from "Components/Settings/SettingsSections/SettingsSections";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { useTranslations } from "Utils/hooks";
import PLAYER_LOGIN_HISTORY_QUERY from "./PlayerLoginHistoryQuery.graphql";

export interface SettingsTranslations {
  account_details_title: string;
  account_details_description: string;
  notifications_title: string;
  notifications_description: string;
  current_session_length: string;
  last_session_message: string;
  account_activity: string;
  logout: string;
}

export function SettingsSectionsContainer() {
  const playerLoginHistory = useQuery<
    A.Player_Login_History_Query,
    A.Player_Login_History_QueryVariables
  >(PLAYER_LOGIN_HISTORY_QUERY);
  const labels = useTranslations<SettingsTranslations>(
    "player-settings-component"
  );
  const dispatch = useDispatch();

  if (playerLoginHistory.loading || !labels) {
    return <SettingsRowListSkeleton count={2} />;
  }
  if (!playerLoginHistory.data || playerLoginHistory.error) {
    return <ErrorMessage retry={() => playerLoginHistory.refetch()} />;
  }

  return (
    <SettingsSections
      playerLoginHistory={playerLoginHistory.data}
      labels={labels}
      logout={() => dispatch(appManualLogoutInit())}
    />
  );
}
