// @flow
import React, { PureComponent } from "react";

import Flex from "@casumo/cmp-flex";
import GameSearchInput from "./GameSearchInput";
import SectionList from "Components/SectionList";
import GameRowSearch from "Components/GameRowSearch";
import SearchNotFound from "Components/SearchNotFound";
import GameListSkeleton from "Components/GameListSkeleton/GameListSkeleton";
import List from "@casumo/cmp-list";
import GamesVirtualList from "Components/GamesVirtualList";

type Props = {
  preloadFetchPlayerGames: Function,
  initFetchQuerySearch: Function,
  clearSearch: Function,
  searchResults: Array<string>,
  latestPlayedGames: Array<string>,
  popularGames: Array<string>,
  hasNoLatestPlayed: boolean,
  loading: boolean,
  hasNoResults: boolean,
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
    <GameListSkeleton hasTitle={hasTitle} titleYOffset={20} />
  );

  renderPopularGames = () => {
    if (!this.props.popularGames.length) {
      return this.renderListSkeleton();
    } else {
      return (
        <SectionList
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
    }
  };

  renderLatestPlayed = () => {
    if (!this.props.latestPlayedGames.length) {
      return this.renderListSkeleton();
    } else {
      return (
        <SectionList
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
    }
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
        <div className="u-padding-horiz--md">{this.renderSuggestions()}</div>
      </React.Fragment>
    );
  };

  renderResults = () => {
    const { loading, hasNoResults, searchResults, query } = this.props;

    if (!searchResults.length && !loading && !hasNoResults) {
      return (
        <GamesVirtualList renderItem={id => <GameRowSearch slug={id} />} />
      );
    }

    if (loading) {
      return (
        <div className="u-padding-horiz--md">
          {this.renderListSkeleton(false)}
        </div>
      );
    }

    if (hasNoResults) {
      return this.renderNoMatch();
    }
    // replace for <VirtualList /> when new api is ready
    return (
      <div className="u-padding-horiz--md">
        <List
          items={searchResults}
          itemSpacing="default"
          render={id => (
            <GameRowSearch query={query} highlightSearchQuery slug={id} />
          )}
        />
        {searchResults.length === 1 && this.renderSuggestions()}
      </div>
    );
  };

  render() {
    return (
      <Flex direction="vertical" spacing="none">
        <div className="t-background-grey-light-2 u-padding--md u-position-sticky">
          <GameSearchInput
            initFetchQuerySearch={this.props.initFetchQuerySearch}
            clearSearch={this.props.clearSearch}
            hasNoResults={this.props.hasNoResults}
            placeholder={this.props.inputPromptPlaceholder}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "72px",
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {this.renderResults()}
        </div>
      </Flex>
    );
  }
}
