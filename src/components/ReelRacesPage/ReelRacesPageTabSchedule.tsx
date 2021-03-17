import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";
import { slice, concat } from "ramda";
import * as A from "Types/apollo";
import type { TReelRacesContentPage } from "./ReelRacesPageContainer";
import { ReelRacesPageTabScheduleTitle } from "./ReelRacesPageTabScheduleTitle";

const PAGE_LIMIT = 10;

type TProps = {
  t: TReelRacesContentPage | null;
  reelRaces: Array<A.ReelRaceScheduleCard_ReelRaceFragment>;
  cardComponent: Function;
};

export const ReelRacesPageTabSchedule = React.memo<TProps>(
  ({ t, reelRaces = [], cardComponent: CardComponent }) => {
    const [showMore, setShowMore] = React.useState(true);
    const [list, setList] = React.useState([]);
    const [index, setIndex] = React.useState(PAGE_LIMIT);
    const [totalArrayData, setTotalArrayData] = React.useState<Array<number>>();

    React.useEffect(() => {
      if (reelRaces.length && !totalArrayData) {
        setTotalArrayData([...Array(reelRaces.length).keys()]);
      }
    }, [reelRaces.length, totalArrayData]);

    React.useEffect(() => {
      if (totalArrayData) {
        setList(slice(0, PAGE_LIMIT, totalArrayData));
      }
    }, [totalArrayData]);

    const loadMore = React.useCallback(() => {
      const newIndex = index + PAGE_LIMIT;
      setIndex(index + PAGE_LIMIT);
      setList(concat(list, slice(index, newIndex, totalArrayData)));
      setShowMore(newIndex < reelRaces.length - 1);
    }, [index, list, reelRaces.length, totalArrayData]);

    if (!reelRaces.length) {
      return null;
    }

    return (
      <>
        {list.map(i => {
          const reelRace = reelRaces[i];
          return (
            <div key={reelRace?.id}>
              <ReelRacesPageTabScheduleTitle
                startTime={reelRace?.startTime}
                status={reelRace?.status}
                t={t}
              />
              <CardComponent
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
);
