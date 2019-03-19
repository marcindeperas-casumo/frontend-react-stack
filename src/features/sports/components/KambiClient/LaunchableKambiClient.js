// @flow
import React from "react";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { Query, Mutation } from "react-apollo";
import { propOr } from "ramda";
import {
  currencySelector,
  countrySelector,
  languageSelector,
} from "Models/handshake";
import {
  MutateOnMount,
  ClientContext,
  SESSION_TOUCH,
} from "Features/sports/state";
import KambiClientSkeleton from "./KambiClientSkeleton";
import KambiClient from "./KambiClient";

export const LAUNCH_KAMBI_MUTATION = gql`
  mutation LaunchKambi {
    launchKambi {
      clientBootstrapUrl
      providerPlayerId
      ticket
    }
  }
`;

export const LAUNCHABLE_KAMBI_CLIENT_QUERY = gql`
  query LaunchableKambiClientQuery {
    userHomepage
    kambiClientVisible @client
    betslipVisible @client
  }
`;

type LaunchableKambiClientProps = {
  currency?: string,
  market?: string,
  locale?: string,
};

class LaunchableKambiClientQuery extends Query<
  LaunchableKambiClientQuery,
  null
> {}
class LaunchKambiMutationOnMount extends MutateOnMount<LaunchKambi> {}

export class LaunchableKambiClient extends React.Component<LaunchableKambiClientProps> {
  static contextType = ClientContext;

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
              {/* eslint-disable-next-line no-shadow */}
              {({ data }) => {
                return (
                  <Mutation mutation={SESSION_TOUCH}>
                    {sessionTouch => (
                      <KambiClient
                        betslipVisible={data.betslipVisible}
                        currency={currency}
                        market={market}
                        locale={locale}
                        bootstrapUrl={clientBootstrapUrl}
                        playerId={providerPlayerId}
                        ticket={ticket}
                        homeRoute={propOr("", "userHomepage", data)}
                        onNavigate={this.onNavigate}
                        isHidden={!data.kambiClientVisible}
                        sessionKeepAlive={sessionTouch}
                      />
                    )}
                  </Mutation>
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
  currency: currencySelector(state),
  market: countrySelector(state).toUpperCase(),
  locale: `${languageSelector(state)}_${countrySelector(state).toUpperCase()}`,
}))(LaunchableKambiClient);
