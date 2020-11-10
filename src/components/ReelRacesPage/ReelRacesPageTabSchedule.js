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

  const PAGE_ITEMS = scheduledreelRaces.length;
  const DATA = [...Array(PAGE_ITEMS).keys()];
  const LIMIT = 10;

  const [showMore, setShowMore] = React.useState(true);
  const [list, setList] = React.useState(slice(0, LIMIT, DATA));
  const [index, setIndex] = React.useState(LIMIT);

  const loadMore = () => {
    const newIndex = index + LIMIT;
    const newShowMore = newIndex < PAGE_ITEMS - 1;
    const newList = concat(list, slice(index, newIndex, DATA));
    setIndex(newIndex);
    setList(newList);
    setShowMore(newShowMore);
  };

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
                    Right Now
                  </Text>
                </Flex>
              )}
              {i === 2 && (
                <Flex align="center" className="u-padding-x--md u-padding-top">
                  <div className="u-width u-height t-border-r--circle t-background-yellow-30"></div>
                  <Text className="u-padding-left u-font-weight-bold" tag="div">
                    Up Next
                  </Text>
                </Flex>
              )}
              {i === 3 && (
                <Flex align="center" className="u-padding-x--md u-padding-top">
                  <Text className="u-padding-left u-font-weight-bold" tag="div">
                    Later Today
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
