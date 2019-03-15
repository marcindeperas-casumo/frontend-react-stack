/* @flow */
import * as React from "react";
import classNames from "classnames";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { groupBy, isEmpty, map, pipe, propOr, take } from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import PersistedData from "Utils/PersistedData";
import { NavigateClientMutation } from "Features/sports/state/clientState";
import MaskText from "Components/MaskText";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import NoResultsIcon from "./no-results-icon.svg";

const TOP_SEARCHES_QUERY = gql`
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

const SEARCH_QUERY = gql`
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
  <Text
    size="md"
    className="t-background-white t-color-grey-dark-2 u-padding-vert--md u-font-weight-bold"
  >
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
    className={classNames("u-padding--md", className || "t-background-white")}
    style={{ marginBottom: 2 }}
    onClick={onClick}
  >
    {children}
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
      <Flex.Item className="u-margin-horiz--md t-background-grey-light-2">
        {this.renderSearchHistory(noOfSearchHistoryItems)}
        {this.renderPopularSearches(noOfPopularSearchItems)}
      </Flex.Item>
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
            <Flex align="center">
              <img src={sport.icon} alt={sport.name} height="48" width="48" />
              <Flex.Block className="u-margin-left--lg">
                <Text
                  size="sm"
                  tag="span"
                  className="t-color-grey-dark-2 u-font-weight-bold"
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
          isMatch ? "t-color-grey-dark-2" : "t-color-grey-dark-1"
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
                  height="48"
                  width="48"
                />
              )}

              <Flex.Block className="u-margin-left--lg">
                <MaskText
                  matchRender={renderText({ isMatch: true })}
                  unmatchedRender={renderText({
                    isMatch: false || renderAllTextAsMatched,
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
          if (res.error || res.loading || !res.data || !res.data.search) {
            return null;
          }

          const groupedResults: {
            [string]: SearchQuery_search[],
          } = groupByResultType(res.data.search);

          if (isEmpty(groupedResults)) {
            return this.renderNoResultsFound();
          }

          return (
            <Flex.Item className="u-margin-horiz--md t-background-grey-light-2">
              {Object.keys(groupedResults).map(typeTitle => (
                <React.Fragment key={typeTitle}>
                  <GroupTitle>{typeTitle}</GroupTitle>
                  {groupedResults[typeTitle].map(result =>
                    this.renderSearchResult(result)
                  )}
                </React.Fragment>
              ))}
            </Flex.Item>
          );
        }}
      </SearchTypedQuery>
    );
  };

  renderNoResultsFound = () => {
    return (
      <>
        <ResultRow className="t-background-grey-light-2 u-padding--lg">
          <Flex align="center">
            <Flex.Item className="u-margin-left--md">
              <NoResultsIcon />
            </Flex.Item>
            <Flex.Block>
              <Text className="u-margin-left u-font-weight-bold">
                <DictionaryTerm termKey="search-results.no-results" />
              </Text>
            </Flex.Block>
          </Flex>
        </ResultRow>
        {this.renderSearchResultsPlaceholder()}
      </>
    );
  };

  render() {
    const content =
      this.props.query.length >= 2
        ? this.renderSearchResults()
        : this.renderSearchResultsPlaceholder();

    return (
      <Flex.Block className="c-kambi-search-results t-background-white">
        {content}
      </Flex.Block>
    );
  }
}

export default KambiSearchResults;
