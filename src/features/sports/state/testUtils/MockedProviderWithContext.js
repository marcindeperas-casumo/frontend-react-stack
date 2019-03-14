import React from "react";
import { ApolloProvider } from "react-apollo";
import { MockedProvider } from "react-apollo/test-utils";
import { ClientContext } from "../ApolloClient";

/**
 * MockedProviderWithContext is an extension of MockedProvider, which also adds the client to the react
 * context, mimicking our current ../ApolloClient.js implementation.
 */
class MockedProviderWithContext extends MockedProvider {
  render() {
    return (
      <ApolloProvider client={this.state.client}>
        <ClientContext.Provider value={{ client: this.state.client }}>
          {this.props.children}
        </ClientContext.Provider>
      </ApolloProvider>
    );
  }
}

export default MockedProviderWithContext;
