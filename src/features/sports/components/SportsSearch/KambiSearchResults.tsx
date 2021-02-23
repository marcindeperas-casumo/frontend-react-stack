/* @flow */
import * as React from "react";
import classNames from "classnames";
import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import { isEmpty, map, pipe, propOr, prop, take } from "ramda";
import debounce from "lodash/debounce";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import tracker from "Services/tracker";
import { EVENTS } from "Src/constants";
import * as A from "Types/apollo";
import { PersistedData } from "Utils";
import { NavigateClientMutation } from "Features/sports/components/GraphQL";
import MaskText from "Components/MaskText";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import SadSumo from "Components/ErrorMessage/sad-sumo.svg";
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

const TOTAL_RECENT_SEARCH_ITEMS = 8;
const TOTAL_POPULAR_SEARCH_ITEMS = 4;

const resultType = {
  PARTICIPANT: "PARTICIPANT",
  SPORT: "SPORT",
  LEAGUE: "LEAGUE",
  REGION: "REGION",
};

export const SEARCH_QUERY = gql`
  query SearchQuery($query: String!) {
    search(query: $query) {
      type
      id
      localizedName
      country

      sport {
        icon
        name
      }
    }
  }
`;

// @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
const GroupTitle = ({ children }: { children: React.Node }): React.Node => (
  <Text className="t-color-grey-50 u-padding--md u-font-weight-bold">
    {children}
  </Text>
);

const ResultRow = ({
  children,
  onClick = () => {},
  className,
}: {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
  onClick?: () => void,
  className?: string,
// @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
}): React.Node => (
  <div
    className={classNames(
      "u-padding-x--md u-cursor-pointer",
      className || "t-background-white"
    )}
    onClick={onClick}
  >
    <div className="u-padding-y--md t-border-bottom t-border-grey-5">
      {children}
    </div>
  </div>
);

type Props = {
  query: string,
  onResultClick: (A.SearchQuery_search | A.TopSearches_topSearches) => void,
  hideSearchResults?: boolean,
};

type State = {
  searchHistory: Array<A.SearchQuery_search>,
};

type TrackSearchClickListType = "popular" | "history" | "result";

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
    this.trackSearchInitiated = debounce(this.trackSearchInitiated, 1000);
  }

  trackSearchInitiated = (query: string, results: boolean) =>
    tracker.track(EVENTS.MIXPANEL_SPORTS_SEARCH_INITIATED, {
      query,
      results,
    });

  trackSearchClick = (
    resultOrGroup: A.SearchQuery_search | A.TopSearches_topSearches,
    list: TrackSearchClickListType
  ) => {
    // will have either props
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    const id = propOr(prop("clientPath", resultOrGroup), "id")(resultOrGroup);
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    const name = propOr(prop("localizedName", resultOrGroup), "name")(
      resultOrGroup
    );

    if (list === "result") {
      tracker.track(EVENTS.MIXPANEL_SPORTS_SEARCH_CLICKED_RESULT, {
        query: this.props.query,
        id,
        name,
      });
    } else {
      tracker.track(EVENTS.MIXPANEL_SPORTS_SEARCH_CLICKED_SUGGESTION, {
        list,
        id,
        name,
      });
    }
  };

  saveSearchHistory = (searchResult: A.SearchQuery_search) => {
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
      {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'children' is missing in type '{ query: D... Remove this comment to see the full error message */}
      <Query
        query={TOP_SEARCHES_QUERY}
        variables={({ count }: A.TopSearchesVariables)}
      >
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'topSearches' is missing in type '{}' but... Remove this comment to see the full error message */}
        {({ data = {} }: { data: ?A.TopSearches }) =>
          pipe(
            propOr([], "topSearches"),
            // @ts-expect-error ts-migrate(2551) FIXME: Property 'renderPopularSearchItem' does not exist ... Remove this comment to see the full error message
            map(this.renderPopularSearchItem)
          )(data)
        }
      </Query>
    </>
  );

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'renderSearchHistory'.
  renderSearchHistory = (count: number) =>
    count > 0 ? (
      <>
        <GroupTitle>
          <DictionaryTerm termKey="search-results.heading.historic" />
        </GroupTitle>
        {map(
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          result => this.renderSearchResult(result, true, "history"),
          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          take(count, this.state.searchHistory)
        )}
      </>
    ) : null;

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'renderSearchResultsPlaceholder'.
  renderSearchResultsPlaceholder = () =>
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    this.state.searchHistory.length
      ? // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
               this.renderSearchHistory(TOTAL_RECENT_SEARCH_ITEMS)
      : // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
               this.renderPopularSearches(TOTAL_POPULAR_SEARCH_ITEMS);

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'renderPopularSearchItem'.
  renderPopularSearchItem = (eventGroup: A.TopSearches_topSearches) => {
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; key: string; path: stri... Remove this comment to see the full error message
            path={eventGroup.termKey}
            onClick={() => {
              // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
              this.props.onResultClick(eventGroup);
              // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
              this.trackSearchClick(eventGroup, "popular");
              navigateClient();
            }}
          >
            <Flex className="u-padding-left" spacing="md" align="center">
              <img src={sport.icon} alt={sport.name} height="24" width="24" />
              <Flex.Block>
                <Text
                  size="sm"
                  tag="span"
                  className="t-color-grey-70 u-font-weight-bold"
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

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'renderSearchResult'.
  renderSearchResult = (
    result: A.SearchQuery_search,
    renderAllTextAsMatched: boolean = false,
    trackType: TrackSearchClickListType = "result"
  ) => {
    const renderText = ({ isMatch }: { isMatch: boolean }) => (
      value: string
    ) => (
      <Text
        size="sm"
        tag="span"
        className={classNames(
          "u-font-weight-bold",
          isMatch ? "t-color-grey-90" : "t-color-grey-50"
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
            // @ts-expect-error ts-migrate(2322) FIXME: Type '{ children: Element; key: string; path: stri... Remove this comment to see the full error message
            path={result.id}
            onClick={() => {
              // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
              this.saveSearchHistory(result);
              // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
              this.props.onResultClick(result);
              // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
              this.trackSearchClick(result, trackType);
              navigateClient();
            }}
          >
            <Flex className="u-padding-left" spacing="md" align="end">
              {result.sport && (
                <img
                  src={result.sport.icon}
                  alt={result.localizedName}
                  height="24"
                  width="24"
                />
              )}

              <div className="u-margin-x u-text-overflow--ellipsis">
                <MaskText
                  matchRender={renderText({ isMatch: true })}
                  unmatchedRender={renderText({
                    isMatch: renderAllTextAsMatched,
                  })}
                  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                  search={this.props.query}
                  text={result.localizedName}
                />
              </div>
              {result.type === resultType.PARTICIPANT && result.sport && (
                <Text
                  size="sm"
                  tag="span"
                  className="t-color-grey-20 u-text-nowrap"
                >
                  {result.sport.name}
                </Text>
              )}
              {result.type === resultType.LEAGUE && (
                <Text
                  size="sm"
                  tag="span"
                  className="t-color-grey-20 u-text-nowrap"
                >
                  {result.country}
                </Text>
              )}
            </Flex>
          </ResultRow>
        )}
      </NavigateClientMutation>
    );
  };

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'renderSearchResults'.
  renderSearchResults = () => {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    if (this.props.hideSearchResults) {
      return null;
    }

    return (
      <Query
        query={SEARCH_QUERY}
        // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
        variables={({ query: this.props.query }: A.SearchQueryVariables)}
      >
        // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
        {(res: { data: ?A.SearchQuery, loading: boolean, error: any }) => {
          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'res'.
          if (res.error) {
            return this.renderNoResultsFound();
          }

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'res'.
          if (res.loading || !res.data || !res.data.search) {
            return (
              <div className="u-margin-x--md">
                <KambiSearchResultsSkeleton />
              </div>
            );
          }

          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'res'.
          if (isEmpty(res.data.search)) {
            // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
            this.trackSearchInitiated(this.props.query, false);

            return this.renderNoResultsFound();
          }

          // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
          this.trackSearchInitiated(this.props.query, true);

          return res.data.search.map(result => this.renderSearchResult(result));
        }}
      </Query>
    );
  };

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'renderNoResultsFound'.
  renderNoResultsFound = () => {
    return (
      <>
        <div className="t-background-grey-0 t-color-grey-50 u-padding-x--xlg u-padding-y--lg">
          <Flex align="center">
            <Flex.Item>
              <SadSumo width="32" height="36" />
            </Flex.Item>
            <Flex.Block>
              <Text className="u-margin-left u-margin-bottom--none u-font-weight-bold">
                <DictionaryTerm termKey="search-results.no-results" />
              </Text>
            </Flex.Block>
          </Flex>
        </div>
        {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
        {this.renderSearchResultsPlaceholder()}
      </>
    );
  };

  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'render'.
  render() {
    const content =
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      this.props.query.length >= 2
        ? // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                   this.renderSearchResults()
        : // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                   this.renderSearchResultsPlaceholder();

    return <Flex.Block className="u-tablet-search-width">{content}</Flex.Block>;
  }
}

export default KambiSearchResults;
