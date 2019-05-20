// @flow
import React from "react";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import AccountDetails from "Components/Settings/AccountDetails/AccountDetails";
import { RowListSkeleton } from "Components/Settings/Row/RowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { PLAYER_SETTINGS_LABELS_QUERY } from "./PlayerSettingsLabelsQuery";
import { PLAYER_SETTINGS_QUERY } from "./PlayerSettingsQuery";

const Composed = adopt({
  labels: ({ render }) => (
    <Query query={PLAYER_SETTINGS_LABELS_QUERY}>{render}</Query>
  ),
  settings: ({ render }) => (
    <Query query={PLAYER_SETTINGS_QUERY}>{render}</Query>
  ),
});

export const withContainer = (Component: Function) => (
  <Composed>
    {({ labels, settings }) => {
      if (labels.loading || settings.loading) {
        return <RowListSkeleton count={6} />;
      }
      if (settings.error) {
        return <ErrorMessage retry={() => settings.refetch()} />;
      }
      if (labels.error) {
        return <ErrorMessage retry={() => labels.refetch()} />;
      }

      return (
        <Component
          labels={labels.data}
          player={settings.data.player}
          refetchSettings={settings.refetch}
        />
      );
    }}
  </Composed>
);
export default () => withContainer(AccountDetails);
