/* @flow */
import React from "react";

import Flex from "@casumo/cmp-flex";

import KambiSearchResults from "./KambiSearchResults";
import SearchInput from "Components/SearchInput";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import {
  ClientContext,
  UPDATE_KAMBI_CLIENT_STATE_MUTATION,
} from "Features/sports/state";

type State = {
  query: string,
  hideSearchResults: boolean,
};

export default class SportsSearch extends React.Component<{}, State> {
  static contextType = ClientContext;

  state = {
    query: "",
    hideSearchResults: false, // hide search results when a result has been selected and the client is filtering on the result
  };

  resetHash = () => {
    // this determines whether to show or hide the kambi client
    // eslint-disable-next-line fp/no-mutation
    window.location.hash = "#home";
  };

  toggleKambiClient = () => {
    this.context.client.mutate<UpdateKambiClientState>({
      mutation: UPDATE_KAMBI_CLIENT_STATE_MUTATION,
      variables: {
        isVisible: !this.state.hideSearchResults,
      },
    });
  };

  handleSearchInput = (event: Event) => {
    this.resetHash();

    if (event.currentTarget instanceof HTMLInputElement) {
      this.setState({
        query: event.currentTarget.value,
        hideSearchResults: false,
      });

      this.toggleKambiClient();
    }
  };

  handleClearSearchInput = () => {
    this.resetHash();

    this.setState({
      query: "",
      hideSearchResults: false,
    });

    this.toggleKambiClient();
  };

  handleFocusSearchInput = () => {
    this.setState({ hideSearchResults: this.state.query.length === 0 });
    this.toggleKambiClient();
  };

  handleSearchResultClick = (
    resultOrEventGroup: SearchQuery_search | TopSearches_topSearches
  ) => {
    this.setState({
      // $FlowIgnore: either type will have either prop
      query: resultOrEventGroup.localizedName || resultOrEventGroup.name,
      hideSearchResults: true,
    });

    this.toggleKambiClient();
  };

  render() {
    return (
      <Flex direction="vertical" spacing="none">
        <Flex.Block className="t-background-grey-light-2">
          <Flex className="u-padding--md" align="stretch">
            <Flex.Block>
              <DictionaryTerm termKey="search-input.placeholder">
                {placeholderText => (
                  <SearchInput
                    autoFocus={true}
                    value={this.state.query}
                    onChange={this.handleSearchInput}
                    onClear={this.handleClearSearchInput}
                    onFocus={this.handleFocusSearchInput}
                    placeholder={placeholderText}
                  />
                )}
              </DictionaryTerm>
            </Flex.Block>
          </Flex>
        </Flex.Block>
        <KambiSearchResults
          query={this.state.query}
          hideSearchResults={this.state.hideSearchResults}
          onResultClick={this.handleSearchResultClick}
        />
      </Flex>
    );
  }
}
