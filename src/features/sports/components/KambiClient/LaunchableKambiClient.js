// @flow
import React from "react";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import { propOr } from "ramda";

import KambiClientSkeleton from "./KambiClientSkeleton";
import KambiClient from "./KambiClient";
import { currency, country, getLanguage } from "Models/handshake";
import {
  MutateOnMount,
  ClientContext,
  UPDATE_BETSLIP_STATE_MUTATION,
} from "Features/sports/state";

const LAUNCH_KAMBI_MUTATION = gql`
  mutation LaunchKambi {
    launchKambi {
      clientBootstrapUrl
      providerPlayerId
      ticket
    }
  }
`;

const LAUNCHABLE_KAMBI_CLIENT_QUERY = gql`
  query LaunchableKambiClient {
    userHomepage
    kambiClientVisible @client
  }
`;

type LaunchableKambiClientProps = {
  currency?: string,
  market?: string,
  locale?: string,
};

class LaunchableKambiClientQuery extends Query<LaunchableKambiClient, null> {}
class LaunchKambiMutationOnMount extends MutateOnMount<LaunchKambi> {}

class LaunchableKambiClient extends React.Component<LaunchableKambiClientProps> {
  static contextType = ClientContext;

  onBetslipVisibleChange = (isVisible: boolean) =>
    this.context.client.mutate<UpdateBetslipState>({
      mutation: UPDATE_BETSLIP_STATE_MUTATION,
      variables: {
        isVisible,
      },
    });

  onNavigate = () =>
    // eslint-disable-next-line fp/no-mutation
    document.querySelectorAll(".scroll-y").forEach(el => (el.scrollTop = 0));

  render() {
    const { currency, market, locale } = this.props;

    if (!currency || !market || !locale) {
      return <KambiClientSkeleton />;
    }

    return (
      <LaunchKambiMutationOnMount mutation={LAUNCH_KAMBI_MUTATION}>
        {({ loading, error, data }) => {
          if (error) {
            return "Error loading client";
          }

          if (!data || !data.launchKambi) {
            return <KambiClientSkeleton />;
          }

          const {
            clientBootstrapUrl,
            providerPlayerId,
            ticket,
          } = data.launchKambi;

          return (
            <LaunchableKambiClientQuery query={LAUNCHABLE_KAMBI_CLIENT_QUERY}>
              {({ data }) => {
                return (
                  <KambiClient
                    currency={currency}
                    market={market}
                    locale={locale}
                    bootstrapUrl={clientBootstrapUrl}
                    playerId={providerPlayerId}
                    ticket={ticket}
                    homeRoute={propOr("", "userHomepage", data)}
                    onBetslipVisibleChange={this.onBetslipVisibleChange}
                    onNavigate={this.onNavigate}
                    isHidden={!data.kambiClientVisible}
                  />
                );
              }}
            </LaunchableKambiClientQuery>
          );
        }}
      </LaunchKambiMutationOnMount>
    );
  }
}

export default connect(state => ({
  currency: currency(state),
  market: country(state).toUpperCase(),
  locale: `${country(state)}_${getLanguage(state).toUpperCase()}`,
}))(LaunchableKambiClient);
