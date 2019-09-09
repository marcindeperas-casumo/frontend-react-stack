/* @flow */
import React from "react";
import Flex from "@casumo/cmp-flex";
import SearchInput from "Components/SearchInput";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { UPDATE_KAMBI_CLIENT_STATE_MUTATION } from "Models/apollo/mutations";
import { GraphQLClientContext } from "Components/GraphQLProvider";
import KambiSearchResults from "./KambiSearchResults";
import "./SportsSearch.scss";
type State = {
  query: string,
  hideSearchResults: boolean,
};

export default class SportsSearch extends React.Component<{}, State> {
  static contextType = GraphQLClientContext;

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
      <>
        <Flex.Block className="t-background-chrome-light-2 u-content-width--tablet c-sports-search__search-bar">
          <Flex className="u-padding--md" align="stretch">
            <Flex.Block>
              <DictionaryTerm termKey="search-input.placeholder">
                {placeholderText => (
                  <SearchInput
                    autofocus
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
        <div className="u-content-width--tablet t-background-chrome-light-2">
          <KambiSearchResults
            query={this.state.query}
            hideSearchResults={this.state.hideSearchResults}
            onResultClick={this.handleSearchResultClick}
          />
        </div>
      </>
    );
  }
}
