import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Media from "@casumo/cmp-media";
import * as React from "react";
import classNames from "classnames";
import {
  topListWidgetWidth,
  topListWidgetHeight,
  topListWidgetHeightTwoRows,
} from "Src/constants";
import type { PotObject } from "./blueRibbonConsts";

export function BlueRibbonJackpotsStaticWidget({
  className = "",
  composedPots,
  widgetColor,
  jackpotLogo,
}: {
  className?: string;
  widgetColor: {
    dark?: string;
    light?: string;
  };
  composedPots: Array<PotObject>;
  jackpotLogo?: string;
}) {
  return (
    <Flex
      direction="vertical"
      justify="center"
      className={`o-position--relative o-flex__item--no-shrink u-padding t-border-r--md u-overflow--hidden ${className}`}
      style={{
        width: topListWidgetWidth,
        backgroundColor: widgetColor.light,
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
              potInformation={composedPot.potInformation}
              potInformationAmount={composedPot.potInformationAmount}
              label={composedPot.name}
              image={composedPot.icon}
              potTitleColor={composedPot.potTitleColor}
            />
          );
        }
      })}
    </Flex>
  );
}

type JackpotRowProps = {
  potInformation: string;
  potInformationAmount: string;
  label: string;
  image: string;
  explanation?: string;
  potTitleColor?: string;
};
function JackpotRow({
  potInformation,
  potInformationAmount,
  label,
  image,
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
            size="sm"
            className={classNames(
              "u-font-weight-bold u-text-transform-uppercase text-white",
              potTitleColor
            )}
          >
            {label}
          </Text>
          <Text size="sm" className="u-margin-bottom--none text-white">
            {`${potInformation} ${potInformationAmount}`}
          </Text>
        </>
      )}
    />
  );
}
