import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Media from "@casumo/cmp-media";
import { QuestionMarkIcon } from "@casumo/cmp-icons";
import * as React from "react";
import { Link } from "@reach/router";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import { formatCurrency } from "Utils";
import {
  topListWidgetWidth,
  topListWidgetHeight,
  topListWidgetHeightTwoRows,
} from "Src/constants";
import type { PotObject } from "./blueRibbonConsts";

export function BlueRibbonJackpotsWidget({
  className = "",
  composedPots,
  widgetColor,
  jackpotLogo,
  explainerPageUrl,
}: {
  className?: string;
  composedPots: Array<PotObject>;
  widgetColor: {
    dark?: string;
    light?: string;
  };
  jackpotLogo?: string;
  explainerPageUrl?: string;
}) {
  const locale = useLocale();
  const currency = useSelector(currencySelector);
  const userViewedJackpotOnboardingOffer = localStorage.getItem(
    "JackpotOnboardingOfferPresented"
  );

  return (
    <Flex
      direction="vertical"
      justify="center"
      className={`o-position--relative u-padding t-border-r--md u-overflow--hidden ${className}`}
      style={{
        backgroundColor: widgetColor.light,
        width: topListWidgetWidth,
        height:
          composedPots.length < 3
            ? topListWidgetHeightTwoRows
            : topListWidgetHeight,
      }}
    >
      {composedPots.map(composedPot => {
        if (!composedPot.sharedPot) {
          return (
            <JackpotRow
              key={composedPot.potKey}
              formattedValue={formatCurrency({
                locale,
                currency,
                value:
                  composedPot.value * (composedPot.mainWinRatio / 100) || 0,
              })}
              label={composedPot.name}
              image={composedPot.icon}
              potTitleColor={composedPot.potTitleColor}
            />
          );
        }

        /**
         * Shared pot, we have to divide it between main winner and community.
         * At this moment, it's split evenly 50:50 but since this comes from
         * backend we can support any split.
         */
        const splittedPot = [
          {
            id: "main",
            formattedValue: formatCurrency({
              locale,
              currency,
              value: composedPot.value * (composedPot.mainWinRatio / 100) || 0,
            }),
            label: composedPot.name,
            image: composedPot.icon,
            explanation: composedPot.potExplanation,
          },
          {
            id: "community",
            formattedValue: formatCurrency({
              locale,
              currency,
              value:
                composedPot.value * (1 - composedPot.mainWinRatio / 100) || 0,
            }),
            label: composedPot.sharedPot.name,
            image: composedPot.sharedPot.icon,
            explanation: composedPot.sharedPot.splitExplanation,
          },
        ];

        return (
          <Flex
            key={composedPot.potKey}
            direction="vertical"
            className="t-border-r--md u-overflow--hidden"
            style={{ backgroundColor: widgetColor.dark }}
          >
            {splittedPot.map(({ id, ...x }) => (
              <JackpotRow key={id} {...x} />
            ))}
          </Flex>
        );
      })}
      <Flex.Item className="o-position--absolute o-inset-left--auto o-inset-right--none o-inset-top--auto o-inset-bottom--none u-margin-right--md u-margin-bottom--md">
        <img
          className="u-display--block t-border-r--circle"
          width={56}
          height={56}
          alt=""
          src={jackpotLogo}
        />
      </Flex.Item>
      <Flex.Item className="o-position--absolute o-inset-left--auto o-inset-right--none o-inset-top--none o-inset-bottom--auto u-margin-right--md u-margin-bottom--md">
        {userViewedJackpotOnboardingOffer && (
          <Link to={explainerPageUrl}>
            <Flex
              direction="vertical"
              justify="center"
              align="center"
              className="t-border-r--circle t-background-white c-icon--md"
            >
              <QuestionMarkIcon className="t-color-grey-90" />
            </Flex>
          </Link>
        )}
      </Flex.Item>
    </Flex>
  );
}

type JackpotRowProps = {
  formattedValue: string;
  label: string;
  image: string;
  explanation?: string;
  potTitleColor?: string;
};
function JackpotRow({
  formattedValue,
  label,
  image,
  explanation,
  potTitleColor,
}: JackpotRowProps) {
  return (
    <Media
      className="u-padding-x--md u-padding-y"
      renderImage={() => (
        <img
          className="u-display--block t-border-r--circle"
          width={56}
          height={56}
          alt={`${label} icon`}
          src={image}
        />
      )}
      renderText={() => (
        <>
          <Text
            size="2xs"
            className={classNames(
              "u-margin-bottom--none u-font-weight-bold u-text-transform-uppercase text-white",
              potTitleColor
            )}
          >
            {label}
          </Text>
          <Text
            size="md"
            className="u-margin-bottom--none u-font-weight-bold text-white"
          >
            {formattedValue}
          </Text>
          {explanation && (
            <Text size="2xs" className="u-margin-bottom--none text-purple-5">
              {explanation}
            </Text>
          )}
        </>
      )}
    />
  );
}
