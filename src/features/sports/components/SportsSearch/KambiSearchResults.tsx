import { gql } from "@apollo/client";
import { Query } from "@apollo/client/react/components";
import debounce from "lodash/debounce";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { isEmpty, map, pipe, propOr, prop, take } from "ramda";
import classNames from "classnames";
import * as React from "react";
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

const GroupTitle = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => (
  <Text className="text-grey-50 p-sm font-bold">{children}</Text>
);

const ResultRow = ({
  children,
  onClick = () => {},
  className,
}: {
  children: JSX.Element;
  onClick?: () => void;
  className?: string;
  path?: string;
}): JSX.Element => (
  <div
    className={classNames("px-sm cursor-pointer", className || "bg-white")}
    onClick={onClick}
  >
    <div className="py-sm border-b border-grey-5">{children}</div>
  </div>
);

type Props = {
  query: string;
  onResultClick: (
    e:
      | A.SearchQuery["search"][number]
      | A.TopSearchesQuery["topSearches"][number]
  ) => void;
  hideSearchResults?: boolean;
};

type State = {
  searchHistory: A.SearchQuery["search"];
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
    resultOrGroup:
      | A.SearchQuery["search"][number]
      | A.TopSearchesQuery["topSearches"][number],
    list: TrackSearchClickListType
  ) => {
    // will have either props
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    const id = propOr(prop("clientPath", resultOrGroup), "id")(resultOrGroup);
    const name = propOr(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      prop("localizedName", resultOrGroup),
      "name"
    )(resultOrGroup);

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

  saveSearchHistory = (searchResult: A.SearchQuery["search"][number]) => {
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
      <Query query={TOP_SEARCHES_QUERY} variables={{ count }}>
        {({ data }) =>
          // @ts-expect-error ts-migrate(2739) FIXME: Type 'Element[]' is missing the following properti... Remove this comment to see the full error message
          pipe(
            propOr([], "topSearches"),
            map(this.renderPopularSearchItem)
          )(data)
        }
      </Query>
    </>
  );

  renderSearchHistory = (count: number) =>
    count > 0 ? (
      <>
        <GroupTitle>
          <DictionaryTerm termKey="search-results.heading.historic" />
        </GroupTitle>
        {map(
          result => this.renderSearchResult(result, true, "history"),
          take(count, this.state.searchHistory)
        )}
      </>
    ) : null;

  renderSearchResultsPlaceholder = () =>
    this.state.searchHistory.length
      ? this.renderSearchHistory(TOTAL_RECENT_SEARCH_ITEMS)
      : this.renderPopularSearches(TOTAL_POPULAR_SEARCH_ITEMS);

  renderPopularSearchItem = (
    eventGroup: A.TopSearchesQuery["topSearches"][number]
  ) => {
    const [sport = eventGroup] = eventGroup.parentGroups;

    return (
      <NavigateClientMutation
        key={eventGroup.termKey}
        variables={{
          path: eventGroup.clientPath,
          trackingLocation: "Search",
        }}
      >
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '(navigateClient: any) => Element' has no pro... Remove this comment to see the full error message */}
        {navigateClient => (
          <ResultRow
            key={eventGroup.termKey}
            path={eventGroup.termKey}
            onClick={() => {
              this.props.onResultClick(eventGroup);
              this.trackSearchClick(eventGroup, "popular");
              navigateClient();
            }}
          >
            <Flex className="pl-sm" spacing="md" align="center">
              <img src={sport.icon} alt={sport.name} height="24" width="24" />
              <Flex.Block>
                <Text size="sm" tag="span" className="text-grey-70 font-bold">
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
    result: A.SearchQuery["search"][number],
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
          "font-bold",
          isMatch ? "text-grey-90" : "text-grey-50"
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
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '(navigateClient: any) => Element' has no pro... Remove this comment to see the full error message */}
        {navigateClient => (
          <ResultRow
            key={result.id}
            path={result.id}
            onClick={() => {
              this.saveSearchHistory(result);
              this.props.onResultClick(result);
              this.trackSearchClick(result, trackType);
              navigateClient();
            }}
          >
            <Flex className="pl-sm" spacing="md" align="end">
              {result.sport && (
                <img
                  src={result.sport.icon}
                  alt={result.localizedName}
                  height="24"
                  width="24"
                />
              )}

              <div className="mx-sm overflow-ellipsis overflow-hidden whitespace-nowrap">
                <MaskText
                  matchRender={renderText({ isMatch: true })}
                  unmatchedRender={renderText({
                    isMatch: renderAllTextAsMatched,
                  })}
                  search={this.props.query}
                  text={result.localizedName}
                />
              </div>
              {result.type === resultType.PARTICIPANT && result.sport && (
                <Text
                  size="sm"
                  tag="span"
                  className="text-grey-20 whitespace-nowrap"
                >
                  {result.sport.name}
                </Text>
              )}
              {result.type === resultType.LEAGUE && (
                <Text
                  size="sm"
                  tag="span"
                  className="text-grey-20 whitespace-nowrap"
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

  renderSearchResults = () => {
    if (this.props.hideSearchResults) {
      return null;
    }

    return (
      <Query query={SEARCH_QUERY} variables={{ query: this.props.query }}>
        {res => {
          if (res.error) {
            return this.renderNoResultsFound();
          }

          if (res.loading || !res.data || !res.data.search) {
            return (
              <div className="mx-sm">
                <KambiSearchResultsSkeleton />
              </div>
            );
          }

          if (isEmpty(res.data.search)) {
            this.trackSearchInitiated(this.props.query, false);

            return this.renderNoResultsFound();
          }

          this.trackSearchInitiated(this.props.query, true);

          return res.data.search.map(result => this.renderSearchResult(result));
        }}
      </Query>
    );
  };

  renderNoResultsFound = () => {
    return (
      <>
        <div className="bg-grey-0 text-grey-50 px-md py-sm">
          <Flex align="center">
            <Flex.Item>
              <SadSumo width="32" height="36" />
            </Flex.Item>
            <Flex.Block>
              <Text className="ml-sm mb-none font-bold">
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
