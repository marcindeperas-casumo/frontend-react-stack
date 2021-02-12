// @flow
import React, { useReducer, useRef } from "react";
import { useUpdateEffect } from "react-use";
import { ReelRaceBoosterPointsValue } from "./ReelRaceBoosterPointsValue";
import { reducer } from "./reducer";
import {
  getBoostersConfig,
  getInitialState,
  UPDATE_ANIMATION,
  UPDATE_PREV_VALUES,
} from "./const";
import "./ReelRaceBoosterPoints.scss";

type Props = {
  bigWins: number,
  megaWins: number,
  triples: number,
  wins: number,
};

const boostersConfig = getBoostersConfig();
const initialState = getInitialState();

export const ReelRaceBoosterPoints = ({
  bigWins = 0,
  megaWins = 0,
  triples = 0,
  wins = 0,
}: Props) => {
  const pointsContainerRef = useRef(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  /* eslint-disable-next-line sonarjs/cognitive-complexity */
  useUpdateEffect(() => {
    const boosters = { bigWins, megaWins, triples, wins };
    const pointsContainer = pointsContainerRef.current || {};
    const currentPoints = {};

    // This check is used to prevent an unnecessary animation when
    // a user revists a race. The initial boosters state starts at
    // 0. When we receive the user's data and if the user has any
    // boosters > 0, we consider that as an update and trigger the
    // corresponding animation. Using this check, we ensure that if
    // the state boosters are 0 but the user's boosters are > 0, it
    // means that the user has landed on the race and this component
    // just mounted for the first time. Otherwise, user's boosters
    // and state boosters will be in sync.
    if (wins && typeof state.boosters.wins === "number") {
      // The user's boosters object and the boostersConfig object have
      // the same keys. This allows us to loop through the users boosters
      // and match the current value with the prev value in state and then
      // locate the necessary config using the same key.
      // eslint-disable-next-line fp/no-loops, no-unused-vars
      for (const booster in boosters) {
        const currentBooster = boosters[booster];
        const currentBoosterConfig = boostersConfig[booster] || {};

        // Only proceed if the current booster is > 0 and different
        // than the corresponding booster in the state.
        if (currentBooster && currentBooster !== state.boosters[booster]) {
          // Set the base points of the matched booster
          // to a local variable to prevent updating the
          // state several times in the same iteration.
          // eslint-disable-next-line fp/no-mutation
          currentPoints.base = currentBoosterConfig.base;

          // Check if the matched booster has extra points to
          // animate when it is hit a certain amount of times.
          if (
            currentBoosterConfig.extra &&
            currentBooster % currentBoosterConfig.showExtraAfter === 0
          ) {
            // Set the base points of the matched booster
            // to a local variable to prevent updating the
            // state several times in the same iteration.
            // eslint-disable-next-line fp/no-mutation
            currentPoints.extra = currentBoosterConfig.extra;
          }

          // This event listener is added to update the state when the points
          // animation is ended. Check reel-race-points-reveal animation in
          // ./ReelRaceBoosterPoints.scss for more information.
          if (typeof pointsContainer.addEventListener === "function") {
            pointsContainer.addEventListener(
              "animationend",
              () => {
                dispatch({
                  type: UPDATE_ANIMATION,
                  payload: {
                    active: false,
                    basePoints: null,
                    extraPoints: null,
                  },
                });
              },
              {}
            );
          }

          // Update the state once, setting the point values
          // to animate as well as enabling the animation.
          dispatch({
            type: UPDATE_ANIMATION,
            payload: {
              active: true,
              extraPoints: currentPoints.extra,
              basePoints: currentPoints.base,
            },
          });

          // Break from the loop to prevent unnecessary
          // iterations after we find the right booster.
          break;
        }
      }
    }

    // Irrelevant of getting boosters or not, we always
    // need to update the boosters in the state to have
    // the most recent version to compare with.
    dispatch({
      type: UPDATE_PREV_VALUES,
      payload: boosters,
    });

    return () => {
      if (typeof pointsContainer.removeEventListener === "function") {
        pointsContainer.removeEventListener("animationend", {});
      }
    };
  }, [bigWins, megaWins, triples, wins]);

  return (
    <div
      className="c-reel-race-icon__boost-points o-position--absolute"
      ref={pointsContainerRef}
    >
      <ReelRaceBoosterPointsValue
        animating={state.animation.active}
        basePoints={state.animation.basePoints}
        extraPoints={state.animation.extraPoints}
      />
    </div>
  );
};
