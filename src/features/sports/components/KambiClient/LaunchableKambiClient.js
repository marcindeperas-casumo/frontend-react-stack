// @flow
import React from "react";
import gql from "graphql-tag";
import { connect } from "react-redux";
import { Query, Mutation } from "react-apollo";
import { getApolloContext } from "@apollo/react-hooks";
import { propOr } from "ramda";
import * as A from "Types/apollo";
import { ErrorMessage } from "Components/ErrorMessage";
import {
  currencySelector,
  countrySelector,
  languageSelector,
} from "Models/handshake";
import { SESSION_TOUCH } from "Models/apollo/mutations";
import { MutateOnMount } from "Features/sports/components/GraphQL";
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
    isBetslipVisible @client
  }
`;

type Props = {
  currency?: string,
  market?: string,
  locale?: string,
};

type State = {
  firstLoadCompleted: boolean,
};

class LaunchKambiMutationOnMount extends MutateOnMount<A.LaunchKambi> {}

export class LaunchableKambiClient extends React.Component<Props, State> {
  static contextType = getApolloContext();

  state = {
    firstLoadCompleted: false,
  };

  onNavigate = () =>
    // eslint-disable-next-line fp/no-mutation
    document.querySelectorAll(".scroll-y").forEach(el => (el.scrollTop = 0));

  setFirstLoadCompleted = () => this.setState({ firstLoadCompleted: true });

  isKambiClientVisible = (kambiLaunchData: A.LaunchableKambiClientQuery) => {
    return kambiLaunchData.kambiClientVisible && this.state.firstLoadCompleted;
  };

  render() {
    const { currency, market, locale } = this.props;

    if (!currency || !market || !locale) {
      return <KambiClientSkeleton />;
    }

    return (
      <LaunchKambiMutationOnMount mutation={LAUNCH_KAMBI_MUTATION}>
        {({ loading, error, data }) => {
          if (error) {
            return <ErrorMessage />;
          }

          if (loading || !data || !data.launchKambi) {
            return <KambiClientSkeleton />;
          }

          const {
            clientBootstrapUrl,
            providerPlayerId,
            ticket,
          } = data.launchKambi;

          return (
            <Query query={LAUNCHABLE_KAMBI_CLIENT_QUERY}>
              {/* eslint-disable-next-line no-shadow */}
              {({ data }: { data: ?A.LaunchableKambiClientQuery }) => {
                if (!data) {
                  return null;
                }
                return (
                  <Mutation mutation={SESSION_TOUCH}>
                    {sessionTouch => (
                      <>
                        <KambiClient
                          isBetslipVisible={data.isBetslipVisible}
                          currency={currency}
                          market={market}
                          locale={locale}
                          bootstrapUrl={clientBootstrapUrl}
                          playerId={providerPlayerId}
                          ticket={ticket}
                          homeRoute={propOr("", "userHomepage", data)}
                          onNavigate={this.onNavigate}
                          isHidden={!this.isKambiClientVisible(data)}
                          sessionKeepAlive={sessionTouch}
                          onLoginCompleted={this.setFirstLoadCompleted}
                        />

                        {/* Show skeleton until kambi client loading is completed */}
                        {!this.state.firstLoadCompleted && (
                          <KambiClientSkeleton />
                        )}
                      </>
                    )}
                  </Mutation>
                );
              }}
            </Query>
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
