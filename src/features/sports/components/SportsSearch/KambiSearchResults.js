/* @flow */
import * as React from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { groupBy, isEmpty, map, pipe, propOr, take } from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { PersistedData } from "Utils";
import { NavigateClientMutation } from "Features/sports/state/clientState";
import MaskText from "Components/MaskText";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import NoResultsIcon from "./no-results-icon.svg";
import KambiSearchResultsSkeleton from "./KambiSearchResultsSkeleton";

export const TOP_SEARCHES_QUERY = gql`
  query TopSearches($count: Int!) {
    topSearches(count: $count) {
      termKey
      name
      clientPath
      icon
      parentGroups {
        icon
        name
      }
    }
  }
`;
class TopSearchesTypedQuery extends Query<TopSearches, TopSearchesVariables> {}

type GroupByResultTypeType = (
  SearchQuery_search[]
) => { [string]: SearchQuery_search[] };

const groupByResultType: GroupByResultTypeType = groupBy(
  result => resultTypesGroupingMap[result.type]
);

const TOTAL_PLACEHOLDER_ITEMS = 5;

// TODO: adampilks - make these properly dynamic translations
// eslint-disable-next-line no-unused-vars
const resultTypesTranslationsMap = {
  PARTICIPANT: "Team",
  SPORT: "Sport",
  REGION: "Region",
  LEAGUE: "League",
};

const resultTypesGroupingMap = {
  PARTICIPANT: "Team",
  SPORT: "Sports, Regions & Leagues",
  REGION: "Sports, Regions & Leagues",
  LEAGUE: "Sports, Regions & Leagues",
};

export const SEARCH_QUERY = gql`
  query SearchQuery($query: String!) {
    search(query: $query) {
      type
      id
      localizedName

      sport {
        icon
        name
      }
    }
  }
`;

const GroupTitle = ({ children }: { children: React.Node }): React.Node => (
  <Text className="t-color-chrome-dark-1 u-padding--md u-font-weight-bold">
    {children}
  </Text>
);

const ResultRow = ({
  children,
  onClick = () => {},
  className,
}: {
  children: React.Node,
  onClick?: () => void,
  className?: string,
}): React.Node => (
  <div
    className={classNames(
      "u-padding-x--md u-cursor-pointer",
      className || "t-background-white"
    )}
    onClick={onClick}
  >
    <div className="u-padding-y--md t-border-bottom">{children}</div>
  </div>
);

class SearchTypedQuery extends Query<SearchQuery, SearchQueryVariables> {}

type Props = {
  query: string,
  onResultClick: (SearchQuery_search | TopSearches_topSearches) => void,
  hideSearchResults?: boolean,
};

type State = {
  searchHistory: Array<SearchQuery_search>,
};

class KambiSearchResults extends React.Component<Props, State> {
  state = {
    searchHistory: [],
  };

  persisted = {
    searchHistory: new PersistedData("sportsSearchHistory", []),
    favouriteGroups: new PersistedData("sportsUserFavouriteGroups", [
      // TODO(CPO): get from clientState instead
      1000093190,
      1000093204,
      1000093193,
      1000093187,
    ]),
  };

  constructor(props: Props) {
    super(props);

    this.state.searchHistory = this.persisted.searchHistory.get();
  }

  saveSearchHistory = (searchResult: SearchQuery_search) => {
    this.setState(prevState => {
      // make sure new entry is not duplicated, is added to beginning and limit to 10
      const newHistory = [
        searchResult,
        ...prevState.searchHistory.filter(
          result => result.id !== searchResult.id
        ),
      ].slice(0, 10);

      this.persisted.searchHistory.set(newHistory);

      return {
        searchHistory: newHistory,
      };
    });
  };

  renderPopularSearches = (count: number) => (
    <>
      <GroupTitle>
        <DictionaryTerm termKey="search-results.heading.popular" />
      </GroupTitle>
      <TopSearchesTypedQuery
        query={TOP_SEARCHES_QUERY}
        variables={{ count: 5 }}
      >
        {({ data = {} }) =>
          pipe(
            propOr([], "topSearches"),
            map(this.renderPopularSearchItem)
          )(data)
        }
      </TopSearchesTypedQuery>
    </>
  );

  renderSearchHistory = (count: number) =>
    count > 0 ? (
      <>
        <GroupTitle>
          <DictionaryTerm termKey="search-results.heading.historic" />
        </GroupTitle>
        {map(
          result => this.renderSearchResult(result, true),
          take(count, this.state.searchHistory)
        )}
      </>
    ) : null;

  renderSearchResultsPlaceholder = () => {
    const searchHistoryCount = this.state.searchHistory.length;

    const noOfSearchHistoryItems = Math.min(
      searchHistoryCount,
      TOTAL_PLACEHOLDER_ITEMS
    );

    const noOfPopularSearchItems = Math.max(
      TOTAL_PLACEHOLDER_ITEMS - searchHistoryCount,
      0
    );

    return (
      <>
        {this.renderSearchHistory(noOfSearchHistoryItems)}
        {this.renderPopularSearches(noOfPopularSearchItems)}
      </>
    );
  };

  renderPopularSearchItem = (eventGroup: TopSearches_topSearches) => {
    const [sport = eventGroup] = eventGroup.parentGroups;

    return (
      <NavigateClientMutation
        key={eventGroup.termKey}
        variables={{
          path: eventGroup.clientPath,
          trackingLocation: "Search",
        }}
      >
        {navigateClient => (
          <ResultRow
            key={eventGroup.termKey}
            path={eventGroup.termKey}
            onClick={() => {
              this.props.onResultClick(eventGroup);
              navigateClient();
            }}
          >
            <Flex spacing="md" align="center">
              <img src={sport.icon} alt={sport.name} height="24" width="24" />
              <Flex.Block>
                <Text
                  size="sm"
                  tag="span"
                  className="t-color-chrome-dark-2 u-font-weight-bold"
                >
                  {eventGroup.name}
                </Text>
              </Flex.Block>
            </Flex>
          </ResultRow>
        )}
      </NavigateClientMutation>
    );
  };

  renderSearchResult = (
    result: SearchQuery_search,
    renderAllTextAsMatched: boolean = false
  ) => {
    const renderText = ({ isMatch }: { isMatch: boolean }) => (
      value: string
    ) => (
      <Text
        size="sm"
        tag="span"
        className={classNames(
          "u-font-weight-bold",
          isMatch ? "t-color-chrome-dark-3" : "t-color-chrome-dark-1"
        )}
      >
        {value}
      </Text>
    );

    return (
      <NavigateClientMutation
        key={result.id}
        variables={{
          path: `filter${result.id}`,
          trackingLocation: "Search",
        }}
      >
        {navigateClient => (
          <ResultRow
            key={result.id}
            path={result.id}
            onClick={() => {
              this.saveSearchHistory(result);
              this.props.onResultClick(result);
              navigateClient();
            }}
          >
            <Flex align="center">
              {result.sport && (
                <img
                  src={result.sport.icon}
                  alt={result.localizedName}
                  height="24"
                  width="24"
                  className="u-opacity-28"
                />
              )}

              <Flex.Block className="u-margin-left--lg">
                <MaskText
                  matchRender={renderText({ isMatch: true })}
                  unmatchedRender={renderText({
                    isMatch: renderAllTextAsMatched,
                  })}
                  search={this.props.query}
                  text={result.localizedName}
                />
              </Flex.Block>
            </Flex>
          </ResultRow>
        )}
      </NavigateClientMutation>
    );
  };

  renderSearchResults = () => {
    if (this.props.hideSearchResults) {
      return null;
    }

    return (
      <SearchTypedQuery
        query={SEARCH_QUERY}
        variables={{ query: this.props.query }}
      >
        {res => {
          if (res.error) {
            return this.renderNoResultsFound();
          }

          if (res.loading || !res.data || !res.data.search) {
            return (
              <div className="u-margin-x--md">
                <KambiSearchResultsSkeleton />
              </div>
            );
          }

          const groupedResults: {
            [string]: SearchQuery_search[],
          } = groupByResultType(res.data.search);

          if (isEmpty(groupedResults)) {
            return this.renderNoResultsFound();
          }

          return (
            <>
              {Object.keys(groupedResults).map(typeTitle => (
                <React.Fragment key={typeTitle}>
                  <GroupTitle>{typeTitle}</GroupTitle>
                  {groupedResults[typeTitle].map(result =>
                    this.renderSearchResult(result)
                  )}
                </React.Fragment>
              ))}
            </>
          );
        }}
      </SearchTypedQuery>
    );
  };

  renderNoResultsFound = () => {
    return (
      <>
        <div className="t-background-chrome-light-2 t-color-chrome-dark-1 u-padding-x--xlg u-padding-y--lg">
          <Flex align="center">
            <Flex.Item>
              <NoResultsIcon />
            </Flex.Item>
            <Flex.Block>
              <Text className="u-margin-left u-margin-bottom--none u-font-weight-bold">
                <DictionaryTerm termKey="search-results.no-results" />
              </Text>
            </Flex.Block>
          </Flex>
        </div>
        {this.renderSearchResultsPlaceholder()}
      </>
    );
  };

  render() {
    const content =
      this.props.query.length >= 2
        ? this.renderSearchResults()
        : this.renderSearchResultsPlaceholder();

    return <Flex.Block className="u-tablet-search-width">{content}</Flex.Block>;
  }
}

export default KambiSearchResults;
