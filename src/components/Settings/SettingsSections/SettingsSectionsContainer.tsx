// @flow
import React from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { appManualLogoutInit } from "Models/app";
import { SettingsSections } from "Components/Settings/SettingsSections/SettingsSections";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { useTranslations } from "Utils/hooks";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './PlayerLoginHistoryQuery.grap... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
  const playerLoginHistory = useQuery<A.PLAYER_LOGIN_HISTORY_QUERY, _>(
    PLAYER_LOGIN_HISTORY_QUERY
  );
  const labels = useTranslations<SettingsTranslations>(
    "player-settings-component"
  );
  const dispatch = useDispatch();

  if (playerLoginHistory.loading || !labels) {
    return <SettingsRowListSkeleton count={2} />;
  }
  if (!playerLoginHistory.data || playerLoginHistory.error) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Promise<ApolloQueryResult<PLAYER_LOGIN_HISTO... Remove this comment to see the full error message
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
