// @flow
import React from "react";
import { isNil } from "ramda";
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
import { Query, Mutation, type, MutationOptions, type, QueryResult, } from "@apollo/client/react/components";
import { adopt } from "react-adopt";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { SettingsRealityCheck } from "Components/Settings/SettingsRealityCheck/SettingsRealityCheck";
import { launchModal } from "Services/LaunchModalService";
import { MODALS } from "Src/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './SettingsRealityCheckLabelsQu... Remove this comment to see the full error message
import { REALITY_CHECK_LABELS_QUERY } from "./SettingsRealityCheckLabelsQuery.graphql";
import { PLAYER_REALITY_CHECK_QUERY } from "./SettingsRealityCheckQuery";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './Mutations.graphql' or its co... Remove this comment to see the full error message
import { UpdateRealityCheckInterval } from "./Mutations.graphql";
const Composed = adopt({
    query: ({ render }) => (<Query query={PLAYER_REALITY_CHECK_QUERY}>{render}</Query>),
    labels: ({ render }) => (<Query query={REALITY_CHECK_LABELS_QUERY}>{render}</Query>),
});
type State = {
    // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
    intervalMinutes: ?number;
};
type RealityCheckOptions = {
    canChangeInterval: boolean;
    isZeroIntervalAllowed: boolean;
};
export const withContainer = (Component: Function) => class SettingsRealityCheckContainer extends React.Component<{}, State> {
    // @ts-expect-error ts-migrate(2416) FIXME: Property 'state' in type 'SettingsRealityCheckCont... Remove this comment to see the full error message
    state = {};
    get intervalMinutes() {
        return (this.state as any).intervalMinutes;
    }
    get intervalSeconds() {
        return Number((this.state as any).intervalMinutes) * 60;
    }
    refresh = async (query: QueryResult) => {
        const { data } = await query.refetch();
        this.setState({
            intervalMinutes: data.player.playOk.realityCheck.intervalInMinutes,
        });
    };
    // @ts-expect-error ts-migrate(2749) FIXME: 'PLAYER_REALITY_CHECK_QUERY' refers to a value, bu... Remove this comment to see the full error message
    save = async (mutate: (options?: MutationOptions) => Promise<PLAYER_REALITY_CHECK_QUERY>, { canChangeInterval, isZeroIntervalAllowed }: RealityCheckOptions) => {
        if (!canChangeInterval) {
            return;
        }
        if ((this.state as any).intervalMinutes === 0 && !isZeroIntervalAllowed) {
            return;
        }
        return await mutate({
            variables: {
                input: {
                    intervalSeconds: this.intervalSeconds,
                },
            },
        });
    };
    onChange = (interval: number) => this.setState({
        intervalMinutes: interval,
    });
    render() {
        return (<Composed>
          {({ query, labels }) => {
            if (query.loading || labels.loading) {
                return <SettingsRowListSkeleton />;
            }
            if (query.error) {
                // @ts-expect-error ts-migrate(2741) FIXME: Property 'retryMessage' is missing in type '{ retr... Remove this comment to see the full error message
                return <ErrorMessage retry={() => query.refetch()}/>;
            }
            if (labels.error) {
                // @ts-expect-error ts-migrate(2741) FIXME: Property 'retryMessage' is missing in type '{ retr... Remove this comment to see the full error message
                return <ErrorMessage retry={() => labels.refetch()}/>;
            }
            const onError = () => {
                this.refresh(query);
                // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ modal: string; }' is not assig... Remove this comment to see the full error message
                launchModal({ modal: MODALS.ERROR });
            };
            const onCompleted = () => this.refresh(query);
            const { data: { player: { playOk: { realityCheck }, }, }, } = query;
            const intervalMinutes = isNil(this.intervalMinutes)
                ? realityCheck.intervalInMinutes
                : this.intervalMinutes;
            return (<Mutation mutation={UpdateRealityCheckInterval} onError={onError} onCompleted={onCompleted}>
                {(mutate, { loading: isUpdateLoading }) => (<Component labels={labels.data} onSave={() => this.save(mutate, realityCheck)} interval={intervalMinutes} onChange={this.onChange} isLoading={isUpdateLoading} canToggleInterval={realityCheck.isZeroIntervalAllowed}/>)}
              </Mutation>);
        }}
        </Composed>);
    }
};
export const SettingsRealityCheckContainer = withContainer(SettingsRealityCheck);
