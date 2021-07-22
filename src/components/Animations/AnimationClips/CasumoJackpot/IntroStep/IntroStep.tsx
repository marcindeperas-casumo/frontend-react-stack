import React from "react";
import Flex from "@casumo/cmp-flex";
import { useSpring, useChain, useSpringRef, animated, to } from "react-spring";
import { ButtonInverted } from "@casumo/cmp-button";
import { useWindowSize } from "react-use";
import { AnimationClipProps } from "Components/Animations/constants";
import { useScreenOrientation } from "Utils/hooks";
import { RotatingRays } from "./RotatingRays";
import { SymbolWithPots } from "./SymbolWithPots/SymbolWithPots";
import "./IntroStep.scss";

type TIntroStepSettings = {
  t: {
    winText: string;
    buttonText: string;
    findOutText: string;
  };
};

type TIntroStepProps = {
  config: AnimationClipProps<TIntroStepSettings>;
  onShowNext: () => void;
};

const smallBounceInOut = {
  friction: 20,
  tension: 700,
};

const slide = {
  friction: 100,
  mass: 10,
  tension: 700,
};

export const IntroStep = ({ config, onShowNext }: TIntroStepProps) => {
  const ref1 = useSpringRef(); //bounce in 1st box
  const ref2 = useSpringRef(); //slide up/down 2nd box
  const ref3 = useSpringRef(); //slide up/down 2nd box

  const { isLandscapeOriented } = useScreenOrientation();
  const { width: windowWidth } = useWindowSize();
  const isLandscape = isLandscapeOriented();

  const [columnVisible, setColumnVisible] = React.useState(false);
  const [potsSectionVisible, setPotsSectionVisible] = React.useState(false);

  const small =
    (isLandscape && windowWidth < 1100) || (!isLandscape && windowWidth < 600);

  const screenSizeBasedRatio = small ? 0.6 : 1;
  const width = 500 * screenSizeBasedRatio;
  const height = 100 * screenSizeBasedRatio;

  const letterSpacing = small ? "3px" : "6px";
  const fontSize = small ? "" : "u-font-lg";
  const buttonSize = small ? "md" : "lg";

  const styles1 = useSpring({
    from: { scale: 0 },
    to: { scale: 1 },
    ref: ref1,
    config: smallBounceInOut,
    onRest: () => setPotsSectionVisible(true),
  });

  const styles2 = useSpring({
    from: { top: 0 },
    to: { top: height / 2 },
    ref: ref2,
    config: smallBounceInOut,
    onRest: () => setColumnVisible(true),
  });

  const moveDestination = isLandscape ? width / 2 : height * 1.5;

  const styles3 = useSpring({
    from: { move: 0, opacity: 0 },
    to: { move: moveDestination, opacity: 1 },
    ref: ref3,
    config: {
      ...slide,
    },
  });

  useChain([ref1, ref2, ref3], [0, 0.5, 1.2]);

  const firstBoxStyles = {
    transform: to(
      [styles1.scale, styles2.top],
      (scale, top) => `scale(${scale}) translate(0, ${top}px)`
    ),
  };

  const secondBoxStyles = {
    transform: to([styles2.top], top => `translate(0, -${top * 2}px)`),
  };

  const orientationBasedTranslate = value =>
    isLandscape ? `translate(${value}px, 0)` : `translate(0, ${value}px)`;

  const thirdBoxStyles = {
    transform: styles3.move.to(move => orientationBasedTranslate(-move)),
  };

  const fourthBoxStyles = {
    transform: styles3.move.to(move =>
      orientationBasedTranslate(move * (isLandscape ? 2 : 2.5))
    ),
    opacity: styles3.opacity,
  };

  return (
    <div className="o-position--absolute u-width--full u-height--full">
      <div className="c-intro_step__position-center">
        <animated.div style={thirdBoxStyles}>
          <animated.div className="o-position--absolute" style={firstBoxStyles}>
            <animated.div
              className="o-position--absolute"
              style={secondBoxStyles}
            >
              <RotatingRays />
              {columnVisible && (
                <animated.div style={fourthBoxStyles}>
                  <div
                    style={{
                      height: 2 * height,
                      width,
                      top: -height / 2,
                      left: -width / 2,
                    }}
                    className="o-position--absolute"
                  >
                    <Flex
                      justify="center"
                      align="center"
                      direction="vertical"
                      className={`u-height--full ${fontSize} u-font-weight-bold`}
                    >
                      <Flex.Item className="u-width--1/2">
                        <ButtonInverted
                          className="u-width--full u-display--block"
                          size={buttonSize}
                          onClick={onShowNext}
                        >
                          {config.settings.t.buttonText}
                        </ButtonInverted>
                      </Flex.Item>
                      <Flex.Item className="t-color-white u-text-align-center">
                        {config.settings.t.findOutText}
                      </Flex.Item>
                    </Flex>
                  </div>
                </animated.div>
              )}
              {potsSectionVisible && (
                <SymbolWithPots isSmall={small} width={width} height={height} />
              )}
            </animated.div>
            <div
              style={{
                width,
                height,
                lineHeight: `${height}px`,
                top: -height / 2,
                left: -width / 2,
                letterSpacing,
              }}
              className={`o-position--absolute ${fontSize} u-font-weight-bold t-background-yellow-30 t-color-purple-50 u-text-align-center`}
            >
              {config.settings.t.winText}
            </div>
          </animated.div>
        </animated.div>
      </div>
    </div>
  );
};
