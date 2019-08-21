import React from "react";
import { ApolloProvider } from "react-apollo";
import { MockedProvider } from "react-apollo/test-utils";
import { GraphQLClientContext } from "Components/GraphQLProvider";

/**
 * MockedProviderWithContext is an extension of MockedProvider, which also adds the client to the react
 * context, mimicking our current implementation.
 */
export class MockedProviderWithContext extends MockedProvider {
  render() {
    return (
      <ApolloProvider client={this.state.client}>
        <GraphQLClientContext.Provider value={{ client: this.state.client }}>
          {this.props.children}
        </GraphQLClientContext.Provider>
      </ApolloProvider>
    );
  }
}
