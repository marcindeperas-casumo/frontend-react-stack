import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import { animated, SpringValue, SpringRef } from "react-spring";
import { useDrag } from "@use-gesture/react";
import { findClosest, projectPosition } from "Utils";

type Props = {
  trailRefs: React.RefObject<HTMLImageElement>[];
  isVertical: boolean;
  svgFiles: {
    jackpotWheel: string;
    staticWheelCenterpiece: string;
    movingWheelCenterpiece: string;
  };
  svgRatio: number;
  rotations: number;
  numberOfTraces: number;
  gap: number;
  rotate: SpringValue<number>;
  scale: SpringValue<number>;
  api: SpringRef<{
    rotate: number;
  }>;
  wonPotKey: string;
  wheelConfigPreset: { frequency: number; damping: number };
  potMap: { [potName: string]: number[] };
  shouldStartScaleAnimation: React.MutableRefObject<boolean>;
  allowDragging: boolean;
};
export function WheelRenderer(props: Props) {
  const bind = useDrag(
    ({ down, offset: [ox, oy], velocity: [vx, vy], direction: [dx, dy] }) => {
      if (!props.allowDragging) {
        return;
      }

      const distance = (props.isVertical ? ox : oy) / 2;
      if (down) {
        props.shouldStartScaleAnimation.current = false; // eslint-disable-line fp/no-mutation
        return props.api.start({
          rotate: Math.max(0, distance),
          immediate: true, // don't animate during gesture
        });
      }
      props.shouldStartScaleAnimation.current = true; // eslint-disable-line fp/no-mutation
      /**
       * Based on velocity we can project position where gesture would end. With this value we can
       * find closest point that would end up on won jackpot (closestWinningRotation). We are
       * calculating rotationDiff because wheel can be rotated infinitely. Projected position can
       * be few rotations away, and adding diff to projected position is safer.
       */
      const velocity = props.isVertical ? vx : vy;
      const projectedPosition = Math.max(
        0,
        distance +
          projectPosition(velocity, 0.988) * (props.isVertical ? dx : dy)
      );
      const reminder = projectedPosition % 360;
      const closestWinningRotation = findClosest(
        props.potMap[props.wonPotKey],
        reminder
      );
      const rotationDiff = closestWinningRotation - reminder;
      const fixedProjectedPosition = projectedPosition + rotationDiff;

      return props.api.start({
        to: {
          rotate: fixedProjectedPosition,
        },
        config: props.wheelConfigPreset,
      });
    },
    {
      axis: props.isVertical ? "x" : "y",
      filterTaps: true,
      from: () => {
        // we always use 1/2 of the distance so this value needs to be multiplied by four
        // (otherwise starting the gesture will reduce current value).
        const current = props.rotate.get() * 2;
        return [current, current];
      },
    }
  );

  return (
    <Flex
      className="o-position--absolute"
      align="center"
      justify="center"
      style={{
        [props.isVertical ? "top" : "right"]: -175 * props.svgRatio,
      }}
    >
      <animated.div
        {...bind()}
        className="o-flex--horizontal o-flex-align--center o-flex-justify--center"
        style={{
          touchAction: "none",
          transform: props.rotate.to(
            // Logic for rotating to won pot and showing pot names assumes that wheel ticker is
            // placed on the left side of wheel. Instead of reworking the logic we can rotate
            // container before showing it to the user. 90 degrees works for ticker at the bottom,
            // 180 for ticker on the right side, 225 for ticker in top-right corner et cetera.
            x => `rotate(-${x + (props.isVertical ? 90 : 0)}deg)`
          ),
          width: 680 * props.svgRatio,
          height: 680 * props.svgRatio,
        }}
      >
        <animated.img
          className="u-height--full u-width--full"
          style={{
            opacity: props.scale.to({
              range: [25, 98],
              output: [1, 0.5],
              extrapolate: "clamp",
            }),
          }}
          src={props.svgFiles.jackpotWheel}
        />
        {R.times(
          i => (
            <animated.img
              key={i}
              ref={props.trailRefs[i]}
              className="u-height--full u-width--full o-position--absolute"
              style={{
                transform: `rotate(${props.gap - i * props.gap}deg)`,
                opacity: 0.001,
              }}
              src={props.svgFiles.jackpotWheel}
            />
          ),
          props.numberOfTraces
        )}
        <animated.img
          className="o-position--absolute"
          style={{
            opacity: props.scale.to({
              range: [25, 30],
              output: [0, 1],
              extrapolate: "clamp",
            }),
            height: 164 * props.svgRatio,
            width: 164 * props.svgRatio,
          }}
          src={props.svgFiles.movingWheelCenterpiece}
        />
      </animated.div>
      <img
        className="o-position--absolute"
        style={{
          width: 188 * props.svgRatio,
          height: 188 * props.svgRatio,
        }}
        src={props.svgFiles.staticWheelCenterpiece}
      />
    </Flex>
  );
}
