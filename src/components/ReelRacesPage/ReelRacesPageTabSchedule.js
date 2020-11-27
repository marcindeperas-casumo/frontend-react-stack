// @flow
import React from "react";
import { filter, propEq, slice, concat } from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { RACE_STATE } from "Models/reelRaces";
import { ReelRaceScheduleCard } from "Components/ReelRaceScheduleCard/ReelRaceScheduleCard";
import { ReelRacesPageTabScheduleQuery } from "./ReelRacesPageTabSchedule.graphql";
import type { ReelRacesContentPage } from "./ReelRacesPage";

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

  const scheduledreelRaces = filter(propEq("status", RACE_STATE.SCHEDULED))(
    reelRaces
  );

  const [showMore, setShowMore] = React.useState(true);
  const [list, setList] = React.useState([]);
  const [index, setIndex] = React.useState(PAGE_LIMIT);
  const [totalArrayData, setTotalArrayData] = React.useState();

  React.useEffect(() => {
    if (scheduledreelRaces.length && !totalArrayData) {
      setTotalArrayData([...Array(scheduledreelRaces.length).keys()]);
    }
  }, [scheduledreelRaces.length, totalArrayData]);

  React.useEffect(() => {
    if (totalArrayData) {
      setList(slice(0, PAGE_LIMIT, totalArrayData));
    }
  }, [totalArrayData]);

  const loadMore = React.useCallback(() => {
    const newIndex = index + PAGE_LIMIT;
    setIndex(index + PAGE_LIMIT);
    setList(concat(list, slice(index, newIndex, totalArrayData)));
    setShowMore(newIndex < scheduledreelRaces.length - 1);
  }, [index, list, scheduledreelRaces.length, totalArrayData]);

  if (scheduledreelRaces.length) {
    return (
      <>
        {list.map(i => {
          return (
            <div key={reelRaces[i]?.id}>
              {i === 1 && (
                <Flex align="center" className="u-padding-x--md u-padding-top">
                  <div className="u-width u-height t-border-r--circle t-background-green-30"></div>
                  <Text className="u-padding-left u-font-weight-bold" tag="div">
                    {t?.right_now}
                  </Text>
                </Flex>
              )}
              {i === 2 && (
                <Flex align="center" className="u-padding-x--md u-padding-top">
                  <div className="u-width u-height t-border-r--circle t-background-yellow-30"></div>
                  <Text className="u-padding-left u-font-weight-bold" tag="div">
                    {t?.up_next}
                  </Text>
                </Flex>
              )}
              {i === 3 && (
                <Flex align="center" className="u-padding-x--md u-padding-top">
                  <Text className="u-padding-left u-font-weight-bold" tag="div">
                    {t?.later_today}
                  </Text>
                </Flex>
              )}
              <ReelRaceScheduleCard
                reelRace={reelRaces[i]}
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

  return null;
}
