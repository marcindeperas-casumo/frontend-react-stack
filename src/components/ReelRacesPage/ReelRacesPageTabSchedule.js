// @flow
import React from "react";
import { filter, propEq, slice, concat, anyPass } from "ramda";
import { ButtonPrimary } from "@casumo/cmp-button";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { RACE_STATE } from "Models/reelRaces";
import { ReelRaceScheduleCard } from "Components/ReelRaceScheduleCard/ReelRaceScheduleCard";
import { ReelRacesPageTabScheduleQuery } from "./ReelRacesPageTabSchedule.graphql";
import type { ReelRacesContentPage } from "./ReelRacesPage";
import { ReelRacesPageTabScheduleTitle } from "./ReelRacesPageTabScheduleTitle";

const PAGE_LIMIT = 10;

type Props = {
  t: ?ReelRacesContentPage,
};

export function ReelRacesPageTabSchedule({ t }: Props) {
  const { data } = useQuery<
    A.ReelRacesPageTabScheduleQuery,
    A.ReelRacesPageTabScheduleQueryVariables
  >(ReelRacesPageTabScheduleQuery, {
    variables: {
      limit: 30,
    },
  });

  const reelRaces = data?.reelRaces || [];

  const scheduledReelRaces = filter(
    anyPass([
      propEq("status", RACE_STATE.SCHEDULED),
      propEq("status", RACE_STATE.STARTED),
    ])
  )(reelRaces);

  const [showMore, setShowMore] = React.useState(true);
  const [list, setList] = React.useState([]);
  const [index, setIndex] = React.useState(PAGE_LIMIT);
  const [totalArrayData, setTotalArrayData] = React.useState();

  React.useEffect(() => {
    if (scheduledReelRaces.length && !totalArrayData) {
      setTotalArrayData([...Array(scheduledReelRaces.length).keys()]);
    }
  }, [scheduledReelRaces.length, totalArrayData]);

  React.useEffect(() => {
    if (totalArrayData) {
      setList(slice(0, PAGE_LIMIT, totalArrayData));
    }
  }, [totalArrayData]);

  const loadMore = React.useCallback(() => {
    const newIndex = index + PAGE_LIMIT;
    setIndex(index + PAGE_LIMIT);
    setList(concat(list, slice(index, newIndex, totalArrayData)));
    setShowMore(newIndex < scheduledReelRaces.length - 1);
  }, [index, list, scheduledReelRaces.length, totalArrayData]);

  if (!scheduledReelRaces.length) {
    return null;
  }

  return (
    <>
      {list.map(i => {
        const reelRace = scheduledReelRaces[i];
        return (
          <div key={reelRace?.id}>
            <ReelRacesPageTabScheduleTitle
              startTime={reelRace?.startTime}
              t={t}
            />
            <ReelRaceScheduleCard
              reelRace={reelRace}
              t={t}
              expanded={i === 0 || i === 1}
            />
          </div>
        );
      })}
      {showMore && (
        <div className="u-text-align-center u-margin-bottom--lg">
          <ButtonPrimary size="md" onClick={loadMore}>
            {t?.show_more_reel_races}
          </ButtonPrimary>
        </div>
      )}
    </>
  );
}
