import React from "react";
import Flex from "@casumo/cmp-flex";
import { useSpring, useChain, useSpringRef, animated, to } from "react-spring";
import { ButtonInverted } from "@casumo/cmp-button";
import { useWindowSize } from "react-use";
import { AnimationClipProps } from "Components/Animations/constants";
import { useScreenOrientation } from "Utils/hooks";
import { MoneyAmountCounter } from "Components/BlueRibbon/MoneyAmountCounter";
import { RotatingRays } from "../RotatingRays/RotatingRays";
import { TopBox } from "./TopBox";
import { PotSymbol } from "./PotSymbol/PotSymbol";

type TIntroStepSettings = {
  t: {
    buttonText: string;
    continueText: string;
    jackpotWinTextRow: string;
    jackpotTypeTextRow: string;
  };
  amount: number;
  potKey: string;
  potName: string;
  locale: string;
  currency: string;
  potColor: string;
  svgFiles: { [potKey: string]: string };
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

export const AmountStep = ({ config, onShowNext }: TIntroStepProps) => {
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

  const fontSize = small ? "" : "u-font-lg";
  const amountFontSize = small ? "u-font-xlg" : "u-font-3xlg";
  const buttonSize = small ? "md" : "lg";

  const { t, amount, currency, potName, potKey, locale, potColor, svgFiles } =
    config.settings;

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

  useChain([ref1, ref2, ref3], [0, 3, 4]);

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
      <div className="c-casumo-jackpot-animation__position-center">
        <animated.div style={thirdBoxStyles}>
          <animated.div className="o-position--absolute" style={firstBoxStyles}>
            <animated.div
              className="o-position--absolute"
              style={secondBoxStyles}
            >
              <div
                className="o-position--absolute"
                style={{ top: -height, left: "50%" }}
              >
                <RotatingRays potColor={potColor} />
              </div>
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
                          {t.buttonText}
                        </ButtonInverted>
                      </Flex.Item>
                      <Flex.Item className="t-color-white u-text-align-center">
                        {t.continueText}
                      </Flex.Item>
                    </Flex>
                  </div>
                </animated.div>
              )}
              {potsSectionVisible && (
                <TopBox
                  t={t}
                  potName={potName}
                  isSmall={small}
                  width={width}
                  height={height}
                  potColor={potColor}
                />
              )}
            </animated.div>
            <div
              style={{
                width,
                height,
                lineHeight: `${height}px`,
                top: -height / 2,
                left: -width / 2,
              }}
              className={`o-position--absolute ${amountFontSize} u-font-weight-bold t-background-purple-50 t-color-yellow-30 u-text-align-center`}
            >
              <MoneyAmountCounter
                amount={amount}
                locale={locale}
                currency={currency}
              />
              <div
                className="o-position--absolute"
                style={{ top: "-120%", left: "50%" }}
              >
                <animated.div
                  className="o-position--absolute"
                  style={secondBoxStyles}
                >
                  <PotSymbol
                    size={height}
                    potSvgUrl={svgFiles[`${potKey}Borderless`]}
                  />
                </animated.div>
              </div>
            </div>
          </animated.div>
        </animated.div>
      </div>
    </div>
  );
};
