// @flow
import React from "react";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import { SettingsSections } from "Components/Settings/SettingsSections/SettingsSections";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import PLAYER_LOGIN_HISTORY_QUERY from "./PlayerLoginHistoryQuery.graphql";
import PLAYER_SECTIONS_LABELS_QUERY from "./PlayerSectionsLabelsQuery.graphql";

const Composed = adopt({
  playerLoginHistory: ({ render }) => (
    <Query query={PLAYER_LOGIN_HISTORY_QUERY}>{render}</Query>
  ),
  labels: ({ render }) => (
    <Query query={PLAYER_SECTIONS_LABELS_QUERY}>{render}</Query>
  ),
});

export const withContainer = (Component: Function) => (
  <Composed>
    {({ playerLoginHistory, labels }) => {
      if (playerLoginHistory.loading || labels.loading) {
        return <SettingsRowListSkeleton count={2} />;
      }
      if (playerLoginHistory.error) {
        return <ErrorMessage retry={() => playerLoginHistory.refetch()} />;
      }
      if (labels.error) {
        return <ErrorMessage retry={() => labels.refetch()} />;
      }

      return (
        <Component
          playerLoginHistory={playerLoginHistory.data}
          labels={labels.data}
        />
      );
    }}
  </Composed>
);

export const SettingsSectionsContainer = () => withContainer(SettingsSections);