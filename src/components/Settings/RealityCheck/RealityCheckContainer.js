// @flow
import React from "react";
import { isNil } from "ramda";
import {
  Query,
  Mutation,
  type MutationOptions,
  type QueryResult,
} from "react-apollo";
import { adopt } from "react-adopt";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { RealityCheck } from "Components/Settings/RealityCheck/RealityCheck";
import { launchModal } from "Services/LaunchModalService";
import { MODALS } from "Src/constants";
// $FlowIgnore
import { REALITY_CHECK_LABELS_QUERY } from "./RealityCheckLabelsQuery.graphql";
import { PLAYER_REALITY_CHECK_QUERY } from "./RealityCheckQuery";
// $FlowIgnore
import { UPDATE_REALITY_CHECK_INTERVAL } from "./Mutations.graphql";

const Composed = adopt({
  query: ({ render }) => (
    <Query query={PLAYER_REALITY_CHECK_QUERY}>{render}</Query>
  ),
  labels: ({ render }) => (
    <Query query={REALITY_CHECK_LABELS_QUERY}>{render}</Query>
  ),
});

type State = {
  intervalMinutes: ?number,
};

export const withContainer = (Component: Function) =>
  class RealityCheckContainer extends React.Component<{}, State> {
    state = {};

    refresh = async (query: QueryResult) => {
      const {
        data: {
          player: {
            playOk: {
              realityCheck: { intervalInMinutes },
            },
          },
        },
      } = await query.refetch();
      this.setState({
        intervalMinutes: intervalInMinutes,
      });
    };

    save = async (
      mutate: (
        options?: MutationOptions
      ) => Promise<PLAYER_REALITY_CHECK_QUERY>,
      {
        canChangeInterval,
        isZeroIntervalAllowed,
      }: { canChangeInterval: boolean, isZeroIntervalAllowed: boolean }
    ) => {
      if (!canChangeInterval) {
        return;
      }

      if (this.state.intervalMinutes === 0 && !isZeroIntervalAllowed) {
        return;
      }
      return mutate({
        variables: {
          input: {
            intervalSeconds: Number(this.state.intervalMinutes) * 60,
          },
        },
      });
    };

    render() {
      return (
        <Composed>
          {({ query, labels }) => {
            if (query.loading || labels.loading) {
              return <SettingsRowListSkeleton />;
            }
            if (query.error) {
              return <ErrorMessage retry={() => query.refetch()} />;
            }
            if (labels.error) {
              return <ErrorMessage retry={() => labels.refetch()} />;
            }

            const {
              data: {
                player: {
                  playOk: { realityCheck },
                },
              },
            } = query;

            const intervalMinutes = isNil(this.state.intervalMinutes)
              ? realityCheck.intervalInMinutes
              : this.state.intervalMinutes;

            return (
              <Mutation
                mutation={UPDATE_REALITY_CHECK_INTERVAL}
                onError={() => {
                  this.refresh(query);
                  launchModal({ modal: MODALS.ERROR });
                }}
                onCompleted={() => this.refresh(query)}
              >
                {(mutate, { loading: updateLoading, error: updateError }) => (
                  <Component
                    labels={labels.data}
                    onSave={() => this.save(mutate, realityCheck)}
                    interval={intervalMinutes}
                    onChange={interval =>
                      this.setState({
                        intervalMinutes: interval,
                      })
                    }
                    updateLoading={updateLoading}
                    updateError={updateError}
                  />
                )}
              </Mutation>
            );
          }}
        </Composed>
      );
    }
  };

export const RealityCheckContainer = () => withContainer(RealityCheck);
