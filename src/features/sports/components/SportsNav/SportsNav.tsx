import { useQuery, getApolloContext } from "@apollo/client";
import { SportsNavigation } from "@casumo/sports-navigation";
import * as React from "react";
import { insert, set, lensProp } from "ramda";
import { USER_NAVIGATION_QUERY } from "Features/sports/components/SportsNav/SportsNavQueries";
import { ErrorMessage } from "Components/ErrorMessage";
import { OpenModalMutation } from "Features/sports/components/GraphQL";
import * as navItemUtils from "Features/sports/components/SportsNav/sportsNavUtils";
import { MODAL } from "Features/sports/components/Modals";
import { useIsAuthenticated } from "Utils/hooks";
import tracker from "Services/tracker";
import { EVENT_PROPS, EVENTS } from "Src/constants";

export type LiveState = [boolean, (boolean) => void];

export type Labels = {
  all: string;
  edit: string;
  live: string;
};

const renderSportsNav = (
  currentHash: string,
  liveState: LiveState,
  data,
  client,
  isAuthenticated: boolean
) => {
  const [isLiveActive, setIsLiveActive] = liveState;
  const [navData, setNavData] = React.useState();

  const trackOnClickLive = state => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_LIVE_NAV_TOGGLE, {
      [EVENT_PROPS.SPORTS_STATE]: state,
    });
  };

  const trackOnSportsNavigationSelected = path => {
    tracker.track(EVENTS.MIXPANEL_SPORTS_NAV_SELECTED, {
      [EVENT_PROPS.SPORTS_SELECTED_NAV]: path,
      [EVENT_PROPS.SPORTS_IS_LIVE_ACTIVE]: isLiveActive,
    });
  };

  // Virtuals button item TSPO-904, to be deleted when Kambi fixes KSD-246938
  const virtualsItem = {
    sport: {
        name: "Virtuals",
        id: "virtuals-item",
        clientPath: "filter/virtuals",
        clientPathLive: "filter/virtuals",
        termKey: "virtuals",
    },
    subNav: []
  }

  React.useEffect(() => {
    if (data?.sportsNavigation.length) {
      setNavData(set(lensProp("sportsNavigation"), insert(2, virtualsItem, data.sportsNavigation), data))
    }
  }, [data?.sportsNavigation])

  return (
    <div className="pt-sm">
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Modal'. */}
      <OpenModalMutation variables={{ modal: MODAL.CHOOSE_FAVOURITES }}>
        {/* @ts-expect-error ts-migrate(2559) FIXME: Type '(openChooseFavouritesModal: any) => Element'... Remove this comment to see the full error message */}
        {openChooseFavouritesModal => (
          <SportsNavigation
            data={navData}
            onSelected={trackOnSportsNavigationSelected}
            onClickLive={trackOnClickLive}
            isLiveActive={isLiveActive}
            setIsLiveActive={setIsLiveActive}
            canEdit={isAuthenticated}
            onEdit={openChooseFavouritesModal}
          />
        )}
      </OpenModalMutation>
    </div>
  );
};

export const SportsNav = ({ currentHash }: { currentHash: string }) => {
  const isAuthenticated = useIsAuthenticated();
  const { client } = React.useContext(getApolloContext());
  const [isLiveActive, setIsLiveActive] = React.useState(
    navItemUtils.isInPlayHash(currentHash)
  );
  const variables = { live: isLiveActive };
  const { error, data, refetch } = useQuery(USER_NAVIGATION_QUERY, {
    variables,
    fetchPolicy: "cache-and-network",
  });
  const [refetchCount, setRefetchCount] = React.useState(0);

  // ensure live mode is kept in sync with changes to the hash made from elsewhere
  React.useEffect(() => {
    setIsLiveActive(navItemUtils.isInPlayHash(currentHash));
  }, [currentHash]);

  React.useEffect(() => {
    if (refetchCount > 3) {
      window.location.reload(true);
    }
  }, [refetchCount]);

  // Decision was made that our nav doesn't add any benefit on the following kambi routes
  // and take too much focus away from what is happening
  if (/#bethistory/.test(currentHash)) {
    return null;
  }

  if (error) {
    return <ErrorMessage direction="horizontal" />;
  }

  const clickRetryRefetchNavigation = () => {
    setRefetchCount(refetchCount + 1);
    refetch();
  };

  if (data && !data.sportsNavigation.length) {
    return (
      <ErrorMessage
        direction="horizontal"
        retry={() => clickRetryRefetchNavigation()}
      />
    );
  }

  return renderSportsNav(
    currentHash,
    [isLiveActive, setIsLiveActive],
    data,
    client,
    isAuthenticated
  );
};
