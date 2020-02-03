/* @flow */
import React from "react";
import { getApolloContext } from "@apollo/react-hooks";
import Flex from "@casumo/cmp-flex";
import debounce from "lodash/debounce";
import * as A from "Types/apollo";
import SearchInput from "Components/SearchInput";
import tracker from "Services/tracker";
import { EVENTS } from "Src/constants";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { UPDATE_KAMBI_CLIENT_STATE_MUTATION } from "Models/apollo/mutations";
import KambiSearchResults from "./KambiSearchResults";
import "./SportsSearch.scss";

type State = {
  query: string,
  hideSearchResults: boolean,
};

export default class SportsSearch extends React.Component<{}, State> {
  static contextType = getApolloContext();

  state = {
    query: "",
    hideSearchResults: false, // hide search results when a result has been selected and the client is filtering on the result
  };

  constructor() {
    super();
    this.trackSearchInitiated = debounce(this.trackSearchInitiated, 1000);
  }

  componentDidMount() {
    tracker.track(EVENTS.MIXPANEL_SPORTS_SEARCH_INTENT);
  }

  trackSearchInitiated = (query: string) =>
    tracker.track(EVENTS.MIXPANEL_SPORTS_SEARCH_INITIATED, {
      query,
    });

  resetHash = () => {
    // this determines whether to show or hide the kambi client
    // eslint-disable-next-line fp/no-mutation
    window.location.hash = "#home";
  };

  setClientVisible = (visible: boolean) => {
    this.context.client.mutate<A.UpdateKambiClientState>({
      mutation: UPDATE_KAMBI_CLIENT_STATE_MUTATION,
      variables: {
        isVisible: visible,
      },
    });
  };

  handleSearchInput = (event: Event) => {
    this.resetHash();

    if (event.currentTarget instanceof HTMLInputElement) {
      this.setState(
        {
          query: event.currentTarget.value,
          hideSearchResults: false,
        },
        () => this.state.query && this.trackSearchInitiated(this.state.query)
      );

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
    resultOrEventGroup: A.SearchQuery_search | A.TopSearches_topSearches,
    suggestion: boolean
  ) => {
    // $FlowIgnore: either type will have either prop
    const query = resultOrEventGroup.localizedName || resultOrEventGroup.name;
    const event = suggestion
      ? EVENTS.MIXPANEL_SPORTS_SEARCH_CLICKED_SUGGESTION
      : EVENTS.MIXPANEL_SPORTS_SEARCH_CLICKED_RESULT;

    this.setState(
      {
        query,
        hideSearchResults: true,
      },
      () =>
        tracker.track(event, {
          query,
        })
    );

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
