import { useQuery } from "@apollo/client";
import { SportsNavigation } from "@casumo/sports-navigation";
import * as React from "react";
import { insert, assoc } from "ramda";
import { USER_NAVIGATION_QUERY } from "Features/sports/components/SportsNav/SportsNavQueries";
import { ErrorMessage } from "Components/ErrorMessage";
import { OpenModalMutation } from "Features/sports/components/GraphQL";
import * as navItemUtils from "Features/sports/components/SportsNav/sportsNavUtils";
import { MODAL } from "Features/sports/components/Modals";
import { useIsAuthenticated } from "Utils/hooks";
import tracker from "Services/tracker";
import { EVENT_PROPS, EVENTS, TMarket } from "Src/constants";

export type LiveState = [boolean, (boolean) => void];

export type Labels = {
  all: string;
  edit: string;
  live: string;
};

const renderSportsNav = (
  liveState: LiveState,
  data,
  isAuthenticated: boolean,
  market: string,
  hasSelectedFavourites: boolean,
  itemsToShow: number
) => {
  const [isLiveActive, setIsLiveActive] = liveState;

  const trackOnClickLive = state => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_LIVE_NAV_TOGGLE, {
      [EVENT_PROPS.SPORTS_STATE]: state,
      [EVENT_PROPS.MARKET]: market,
    });
  };

  const trackOnSportsNavigationSelected = (hash, order) => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_NAV_SELECTED, {
      [EVENT_PROPS.SPORTS_SELECTED_NAV]: hash,
      [EVENT_PROPS.SPORTS_IS_LIVE_ACTIVE]: isLiveActive,
      [EVENT_PROPS.SPORTS_NAV_BUTTON_ORDER]: order,
      [EVENT_PROPS.MARKET]: market,
    });
  };

  return (
    <div className="pt-sm">
      <OpenModalMutation variables={{ modal: MODAL.CHOOSE_FAVOURITES }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '(openChooseFavouritesModal: any) => Element'... Remove this comment to see the full error message */}
        {openChooseFavouritesModal => (
          <SportsNavigation
            data={data}
            onSelected={trackOnSportsNavigationSelected}
            onClickLive={trackOnClickLive}
            isLiveActive={isLiveActive}
            setIsLiveActive={setIsLiveActive}
            canEdit={isAuthenticated}
            onEdit={openChooseFavouritesModal}
            hasSelectedFavourites={hasSelectedFavourites}
            itemsToShow={itemsToShow}
          />
        )}
      </OpenModalMutation>
    </div>
  );
};

export const SportsNav = ({
  currentHash,
  market,
  hasSelectedFavourites,
  itemsToShow,
}: {
  currentHash: string;
  market?: TMarket;
  hasSelectedFavourites: boolean;
  itemsToShow: number;
}) => {
  const isAuthenticated = useIsAuthenticated();
  const [isLiveActive, setIsLiveActive] = React.useState(
    navItemUtils.isInPlayHash(currentHash)
  );
  const { error, data, refetch } = useQuery(USER_NAVIGATION_QUERY, {
    variables: { live: false },
    fetchPolicy: "cache-and-network",
  });
  const {
    error: errorLive,
    data: dataLive,
    refetch: refetchLive,
  } = useQuery(USER_NAVIGATION_QUERY, {
    variables: { live: true },
    fetchPolicy: "cache-and-network",
  });
  const [refetchCount, setRefetchCount] = React.useState(0);
  const [navData, setNavData] = React.useState();

  // ensure live mode is kept in sync with changes to the hash made from elsewhere
  React.useEffect(() => {
    setIsLiveActive(navItemUtils.isInPlayHash(currentHash));
  }, [currentHash]);

  React.useEffect(() => {
    if (refetchCount > 3) {
      // @ts-expect-error: apply fix if you know the context
      window.location.reload(true);
    }
  }, [refetchCount]);

  // Virtuals button item TSPO-904, to be deleted when Kambi fixes KSD-246938
  React.useEffect(() => {
    if (
      data?.sportsNavigation.length &&
      dataLive?.sportsNavigation.length &&
      market
    ) {
      const virtualsMarkets = [
        "ca_en",
        "in_en",
        "fi_fi",
        "no_no",
        "se_sv",
        "at_de",
        "ie_en",
        "gb_en",
      ];
      const virtualsItem = {
        sport: {
          name: data.virtualsSportsLabel,
          id: "virtuals-item",
          clientPath: "filter/virtuals",
          clientPathLive: "filter/virtuals",
          termKey: "virtuals",
        },
        subNav: [],
      };

      const orderedData = {
        ...data,
        sportsNavigation: data.sportsNavigation.map((o, i) => ({
          ...o,
          sport: {
            ...o.sport,
            order: i,
          },
        })),
        sportsNavigationLive: dataLive.sportsNavigation,
      };

      setNavData(
        virtualsMarkets.includes(market)
          ? assoc(
              "sportsNavigation",
              insert(2, virtualsItem, orderedData.sportsNavigation),
              orderedData
            )
          : orderedData
      );
    }
  }, [data, dataLive, market]);

  // Decision was made that our nav doesn't add any benefit on the following kambi routes
  // and take too much focus away from what is happening
  if (/#bethistory/.test(currentHash)) {
    return null;
  }

  if (error || errorLive) {
    return <ErrorMessage direction="horizontal" />;
  }

  const clickRetryRefetchNavigation = () => {
    setRefetchCount(refetchCount + 1);
    refetch();
    refetchLive();
  };

  if (
    data &&
    !data.sportsNavigation.length &&
    !dataLive.sportsNavigation.length
  ) {
    return (
      <ErrorMessage
        direction="horizontal"
        retry={() => clickRetryRefetchNavigation()}
      />
    );
  }

  return renderSportsNav(
    [isLiveActive, setIsLiveActive],
    navData,
    isAuthenticated,
    market,
    hasSelectedFavourites,
    itemsToShow
  );
};
