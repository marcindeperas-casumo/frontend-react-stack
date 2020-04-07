// @flow
import React from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { appManualLogoutInit } from "Models/app";
import { SettingsSections } from "Components/Settings/SettingsSections/SettingsSections";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import PLAYER_LOGIN_HISTORY_QUERY from "./PlayerLoginHistoryQuery.graphql";
import PLAYER_SECTIONS_LABELS_QUERY from "./PlayerSectionsLabelsQuery.graphql";

export function SettingsSectionsContainer() {
  const playerLoginHistory = useQuery<A.PLAYER_LOGIN_HISTORY_QUERY, _>(
    PLAYER_LOGIN_HISTORY_QUERY
  );
  const labels = useQuery<A.PLAYER_SECTIONS_LABELS_QUERY, _>(
    PLAYER_SECTIONS_LABELS_QUERY
  );
  const dispatch = useDispatch();

  if (playerLoginHistory.loading || labels.loading) {
    return <SettingsRowListSkeleton count={2} />;
  }
  if (!playerLoginHistory.data || playerLoginHistory.error) {
    return <ErrorMessage retry={() => playerLoginHistory.refetch()} />;
  }
  if (!labels.data || labels.error) {
    return <ErrorMessage retry={() => labels.refetch()} />;
  }

  return (
    <SettingsSections
      playerLoginHistory={playerLoginHistory.data}
      labels={labels.data}
      logout={() => dispatch(appManualLogoutInit())}
    />
  );
}
