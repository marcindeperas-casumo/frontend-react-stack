// @flow
import React from "react";
import { Query } from "react-apollo";
import { adopt } from "react-adopt";
import Sections from "Components/Settings/Sections/Sections";
import { RowListSkeleton } from "Components/Settings/Row/RowListSkeleton";
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
        return <RowListSkeleton count={2} />;
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

export default () => withContainer(Sections);
