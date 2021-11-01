import * as React from "react";
import * as R from "ramda";
import { useSpring } from "react-spring";
import { findClosest } from "Utils";
import { useScreenOrientation } from "Utils/hooks";
import { WheelRenderer } from "./WheelRenderer";
import { TickerRenderer } from "./TickerRenderer";

type SpringConfig = {
  frequency: number;
  damping: number;
  precision?: number;
};
type Props = {
  wonPotKey: string;
  /**
   * Those are points where every jackpot lies on the circle. Current circle has few assumptions that
   * could make guessing where each jackpot lies a little bit easier (circle is divided in 24 equal
   * sections (6 per jackpot), every section spans over the same area (15 degrees) and sections for
   * different jackpots are repeated in the same order).
   * With those limitations we just need order of jackpots on the wheel and position of one of them.
   *
   * I don't feel that we should limit ourselfs like this. If we decide to ignore those assumptions
   * we can create more generic solution that could allow "better" wheels in the future. Better here
   * means smaller section for higher jackpot or different amount of sections depending on rarity of
   * the jackpot.
   * With those assumptions we need list of degrees for each jackpot.
   *
   * Wheel ideally would not have any section starting from 0deg, this point should be center of one
   * section so we can use 0 and 360 while rounding.
   *
   * If center of circle is 0,0 point corresponding to 0/360deg would be -n,0.
   */
  potMap: { [potName: string]: number[] };
  wheelConfigPreset: SpringConfig;
  tickerConfigPreset: SpringConfig;
  svgFiles: {
    jackpotWheel: string;
    staticWheelCenterpiece: string;
    movingWheelCenterpiece: string;
    [potName: string]: string;
  };
  potColors: { [potName: string]: string };
  t: {
    startSpinning: string;
    [potKey: string]: string;
  };
  rotations: number;
  numberOfTraces: number;
  gap: number;
  velocityToGapRatio: number;
  ticker: {
    horizontal: React.SVGProps<SVGSVGElement>;
    vertical: React.SVGProps<SVGSVGElement>;
  };
  onAnimationEnd: () => void;
  isWheelConfigurator?: boolean;
};

export function useContainerMeasurer() {
  const containerRef = React.useRef<HTMLDivElement>();

  if (containerRef.current) {
    return {
      containerHeight: containerRef.current.clientHeight,
      containerWidth: containerRef.current.clientWidth,
      containerRef,
    };
  }

  return {
    containerHeight: window.innerHeight,
    containerWidth: window.innerWidth,
    containerRef,
  };
}

export function Wheel(props: Props) {
  const trailRefs = useThirtyRefs();
  const [animationTriggered, setAnimationTriggered] = React.useState(false);
  const animated = React.useRef(false);
  const {
    containerRef,
    containerHeight,
    containerWidth,
  } = useContainerMeasurer();
  const shouldStartScaleAnimation = React.useRef(false);
  const { isPortraitOriented } = useScreenOrientation();
  const isVertical = isPortraitOriented();
  const svgRatio = useSVGRatio({
    isVertical,
    width: containerWidth,
    height: containerHeight,
  });
  const [{ rotate }, api] = useSpring(() => ({
    to: { rotate: 0 },
    config: props.wheelConfigPreset,
    onChange: ({ value }, { springs }) => {
      const lastVelocity = springs.rotate.animation.values[0].lastVelocity;
      const opacity = Math.min(0.1, Math.abs(lastVelocity) / 10).toString();
      R.times(i => {
        trailRefs[i].current.style.opacity = opacity; // eslint-disable-line fp/no-mutation
        if (props.velocityToGapRatio !== 0) {
          // eslint-disable-next-line fp/no-mutation
          trailRefs[i].current.style.transform = `rotate(${
            i * lastVelocity * props.velocityToGapRatio
          }deg)`;
        }
      }, props.numberOfTraces);

      if (!shouldStartScaleAnimation.current) {
        return;
      }

      const currentRotation = value.rotate;
      const destination = springs.rotate.animation.to as number;

      if (Math.abs(destination - currentRotation) < 1) {
        apiScale.start(() => ({
          to: {
            scale: 100,
          },
        }));
      }
    },
  }));
  const [{ scale }, apiScale] = useSpring(() => ({
    from: { scale: 0 },
    config: props.tickerConfigPreset,
    onRest: () => {
      setTimeout(() => {
        props.onAnimationEnd();
      }, 100);
      animated.current = !props.isWheelConfigurator; // eslint-disable-line fp/no-mutation
      // temporary for easier storybook testing
      if (props.isWheelConfigurator) {
        api.pause();
        apiScale.start(() => ({
          to: { scale: 0 },
          immediate: true,
        }));
      }
    },
  }));
  const handleClick = () => {
    if (animationTriggered) {
      return false;
    }

    setAnimationTriggered(true);
    shouldStartScaleAnimation.current = true; // eslint-disable-line fp/no-mutation
    const pos = rotate.get() + props.rotations;
    const reminder = pos % 360;
    const closestWinningRotation = findClosest(
      props.potMap[props.wonPotKey],
      reminder
    );
    const rotationDiff = closestWinningRotation - reminder;
    const fixedProjectedPosition = pos + rotationDiff;

    api.resume();
    api.start({
      to: {
        rotate: fixedProjectedPosition,
      },
      config: props.wheelConfigPreset,
    });
  };

  return (
    <div
      ref={containerRef}
      onClick={handleClick}
      className="o-flex--horizontal o-flex-align--center o-flex-justify--normal u-height--full u-width--full"
      style={{
        flexDirection: isVertical ? "column-reverse" : "row",
        transform: "translate3d(0, 0, 0)",
      }}
    >
      <TickerRenderer
        isVertical={isVertical}
        svgRatio={svgRatio}
        rotate={rotate}
        scale={scale}
        ticker={props.ticker}
        potMap={props.potMap}
        svgFiles={props.svgFiles}
        wonPotKey={props.wonPotKey}
        potColors={props.potColors}
        t={props.t}
      />
      <WheelRenderer
        shouldStartScaleAnimation={shouldStartScaleAnimation}
        isVertical={isVertical}
        trailRefs={trailRefs}
        svgRatio={svgRatio}
        rotate={rotate}
        scale={scale}
        api={api}
        gap={props.gap}
        svgFiles={props.svgFiles}
        potMap={props.potMap}
        rotations={props.rotations}
        wonPotKey={props.wonPotKey}
        numberOfTraces={props.numberOfTraces}
        allowDragging={props.isWheelConfigurator}
        wheelConfigPreset={props.wheelConfigPreset}
      />
    </div>
  );
}

export function useSVGRatio({
  isVertical,
  width,
  height,
}: {
  isVertical: boolean;
  width: number;
  height: number;
}) {
  // During development 870:390 view was used and all svg got their values from that screen
  if (isVertical) {
    const tmpRatio = width / 390;
    if (tmpRatio * 870 > width) {
      return height / 870;
    }
    return tmpRatio;
  }

  const tmpRatio = height / 390;
  if (tmpRatio * 870 > height) {
    return width / 870;
  }
  return tmpRatio;
}

// I allow max of 30 wheel trails in storybook, their styles are set imperatively during animation
// because I need to use spring velocity and couldn't find other way. To set those styles ref on
// each element is needed.
function useThirtyRefs() {
  return [
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
    React.useRef<HTMLImageElement>(),
  ];
}
