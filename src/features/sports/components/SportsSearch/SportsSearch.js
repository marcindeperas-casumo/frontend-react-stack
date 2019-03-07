/* @flow */
import React from "react";
import Flex from "@casumo/cmp-flex";
import "./SportsSearch.scss";
import SearchInput from "Components/SearchInput";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import {
  ClientContext,
  UPDATE_KAMBI_CLIENT_STATE_MUTATION,
} from "Features/sports/state";
import KambiSearchResults from "./KambiSearchResults";

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

  setClientVisible = (visible: boolean) => {
    this.context.client.mutate<UpdateKambiClientState>({
      mutation: UPDATE_KAMBI_CLIENT_STATE_MUTATION,
      variables: {
        isVisible: visible,
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

      this.setClientVisible(false);
    }
  };

  handleClearSearchInput = () => {
    this.resetHash();

    this.setState({
      query: "",
      hideSearchResults: false,
    });

    this.setClientVisible(false);
  };

  handleFocusSearchInput = () => {
    this.setState({ hideSearchResults: this.state.query.length === 0 });
    this.setClientVisible(false);
  };

  handleSearchResultClick = (
    resultOrEventGroup: SearchQuery_search | TopSearches_topSearches
  ) => {
    this.setState({
      // $FlowIgnore: either type will have either prop
      query: resultOrEventGroup.localizedName || resultOrEventGroup.name,
      hideSearchResults: true,
    });

    this.setClientVisible(true);
  };

  render() {
    return (
      <Flex direction="vertical" spacing="none">
        <Flex.Block className="t-background-grey-light-2">
          <Flex className="u-padding--md" align="stretch">
            <Flex.Block>
              <DictionaryTerm termKey="search-input.placeholder">
                {placeholderText => (
                  <div className="u-tablet-search-width">
                    <SearchInput
                      autoFocus={true}
                      value={this.state.query}
                      onChange={this.handleSearchInput}
                      onClear={this.handleClearSearchInput}
                      onFocus={this.handleFocusSearchInput}
                      placeholder={placeholderText}
                    />
                  </div>
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
