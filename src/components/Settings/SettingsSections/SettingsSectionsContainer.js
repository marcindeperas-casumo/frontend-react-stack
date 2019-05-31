// @flow
import React from "react";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import { SettingsSections } from "Components/Settings/SettingsSections/SettingsSections";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { PLAYER_SECTIONS_QUERY } from "./PlayerSectionsQuery";
import { PLAYER_SECTIONS_LABELS_QUERY } from "./PlayerSectionsLabelsQuery";

const Composed = adopt({
  settings: ({ render }) => (
    <Query query={PLAYER_SECTIONS_QUERY}>{render}</Query>
  ),
  labels: ({ render }) => (
    <Query query={PLAYER_SECTIONS_LABELS_QUERY}>{render}</Query>
  ),
});

export const withContainer = (Component: Function) => (
  <Composed>
    {({ settings, labels }) => {
      if (settings.loading || labels.loading) {
        return <SettingsRowListSkeleton count={2} />;
      }
      if (settings.error) {
        return <ErrorMessage retry={() => settings.refetch()} />;
      }
      if (labels.error) {
        return <ErrorMessage retry={() => labels.refetch()} />;
      }

      return <Component playerQuery={settings.data} labels={labels.data} />;
    }}
  </Composed>
);

export const SettingsSectionsContainer = () => withContainer(SettingsSections);
