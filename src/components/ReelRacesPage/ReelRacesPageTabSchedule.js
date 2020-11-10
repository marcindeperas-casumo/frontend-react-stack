// @flow
import React from "react";
import { filter, propEq } from "ramda";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
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
      limit: 20,
    },
  });

  const reelRaces = data?.reelRaces || [];

  if (data && reelRaces && reelRaces.length) {
    const scheduledreelRaces = filter(propEq("status", RACE_STATE.SCHEDULED))(
      reelRaces
    );

    return (
      <>
        {scheduledreelRaces.map((reelRace, i) => (
          <div key={reelRace.id}>
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
            <ReelRaceScheduleCard
              reelRace={reelRace}
              t={t}
              isOpen={i === 0 || i === 1}
            />
          </div>
        ))}
      </>
    );
  }

  return null;
}
