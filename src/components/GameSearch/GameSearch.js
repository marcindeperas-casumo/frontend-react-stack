// @flow
import React, { PureComponent } from "react";

import GameSearchInput from "./GameSearchInput";
import SectionList from "Components/SectionList";
import GameRowSearch from "Components/GameRowSearch";
import SearchNotFound from "Components/SearchNotFound";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";
import List from "@casumo/cmp-list";
import GamesVirtualList from "Components/GamesVirtualList";

import "./GameSearch.scss";

type Props = {
  preloadFetchPlayerGames: Function,
  initFetchQuerySearch: Function,
  clearSearch: Function,
  searchResults: Array<string>,
  latestPlayedGames: Array<string>,
  popularGames: Array<string>,
  hasNoLatestPlayed: boolean,
  loading: boolean,
  noResults: boolean,
  fetchPageBySlug: () => void,
  popularGamesTitle: string,
  latestPlayedGamesTitle: string,
  inputPromptPlaceholder: string,
  query: string,
};

export default class GameSearch extends PureComponent<Props> {
  componentDidMount() {
    this.props.fetchPageBySlug();
  }

  renderListSkeleton = (hasTitle: boolean = true) => (
    <GameListSkeleton
      className="u-padding-horiz--md"
      hasTitle={hasTitle}
      titleYOffset={20}
    />
  );

  renderPopularGames = () => {
    if (!this.props.popularGames.length) {
      return this.renderListSkeleton();
    }

    return (
      <SectionList
        className="u-padding-horiz--md"
        sections={[
          {
            title: this.props.popularGamesTitle,
            data: this.props.popularGames,
          },
        ]}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={id => <GameRowSearch slug={id} />}
      />
    );
  };

  renderLatestPlayed = () => {
    if (!this.props.latestPlayedGames.length) {
      return this.renderListSkeleton();
    }

    return (
      <SectionList
        className="u-padding-horiz--md"
        sections={[
          {
            title: this.props.latestPlayedGamesTitle,
            data: this.props.latestPlayedGames,
          },
        ]}
        renderSectionHeader={this.renderSectionHeader}
        renderItem={id => <GameRowSearch slug={id} />}
      />
    );
  };

  renderSuggestions = () =>
    this.props.hasNoLatestPlayed
      ? this.renderPopularGames()
      : this.renderLatestPlayed();

  renderSectionHeader = (title: string) => (
    <p className="u-font-weight-bold u-font-md u-padding-top--lg u-padding-bottom--md">
      {title}
    </p>
  );

  renderNoMatch = () => {
    const field = this.props.hasNoLatestPlayed
      ? "no_results_popular"
      : "no_results_continue_playing";

    return (
      <React.Fragment>
        <SearchNotFound contentField={field} />
        {this.renderSuggestions()}
      </React.Fragment>
    );
  };

  renderResults = () => {
    const { loading, noResults, searchResults, query } = this.props;

    if (!searchResults.length && !loading && !noResults) {
      return (
        <div className="c-game-search-virtual-list">
          <GamesVirtualList renderItem={id => <GameRowSearch slug={id} />} />
        </div>
      );
    }

    if (loading) {
      return this.renderListSkeleton(false);
    }

    if (noResults) {
      return this.renderNoMatch();
    }
    // replace for <VirtualList /> when new api is ready
    return (
      <React.Fragment>
        <List
          className="u-padding-top u-padding-horiz--md"
          items={searchResults}
          itemSpacing="default"
          render={id => (
            <GameRowSearch query={query} highlightSearchQuery slug={id} />
          )}
        />
        {searchResults.length === 1 && this.renderSuggestions()}
      </React.Fragment>
    );
  };

  render() {
    return (
      <React.Fragment>
        <div className="u-padding--md u-position-sticky c-game-search-bar">
          <GameSearchInput
            initFetchQuerySearch={this.props.initFetchQuerySearch}
            clearSearch={this.props.clearSearch}
            noResults={this.props.noResults}
            placeholder={this.props.inputPromptPlaceholder}
          />
          <div className="t-background-grey-light-2 c-game-search-input-bg" />
        </div>
        {this.renderResults()}
      </React.Fragment>
    );
  }
}
