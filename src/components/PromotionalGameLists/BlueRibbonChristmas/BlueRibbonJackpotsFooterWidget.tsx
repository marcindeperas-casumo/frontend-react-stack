import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { useInterval } from "react-use";
import * as React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import { formatCurrency } from "Utils";
import type { PotObject } from "./blueRibbonConsts";
import "./blueRibbonJackpotsFooterWidget.scss";
import { BlueRibbonJackpotValue } from "./BlueRibbonJackpotValue";

export function BlueRibbonJackpotsFooterWidget({
  normalizedPots,
}: {
  normalizedPots: Array<PotObject>;
}) {
  const locale = useLocale();
  const currency = useSelector(currencySelector);
  const [visibleSection, setVisibleSection] = React.useState(0);

  const formattedPotValue = pot => {
    return formatCurrency({
      currency,
      locale,
      value: pot.value,
    });
  };

  useInterval(() => {
    if (normalizedPots.length > 2) {
      setVisibleSection(x => 1 - x);
    }
  }, 5000);

  const jackpotsRows =
    normalizedPots.length > 2
      ? [normalizedPots.slice(0, 2), normalizedPots.slice(2, 4)]
      : [normalizedPots];

  return (
    <div className="u-overflow--hidden bg-grey-90 o-flex-align--center o-flex-justify--center">
      <Flex
        direction="vertical"
        className="u-overflow--hidden bg-grey-70 c-br-footer-widget__container-height c-br-footer-widget__container-width"
      >
        <Flex
          direction="vertical"
          className={classNames("c-br-footer-widget__animation-transition", {
            "c-br-footer-widget__transform-animation--reset": !visibleSection,
            "c-br-footer-widget__transform-animation": visibleSection,
          })}
        >
          {jackpotsRows.map((row, i) => (
            <Flex
              key={i}
              direction="horizontal"
              align="center"
              justify="center"
              spacing="lg"
              className={classNames(
                "o-flex__item--no-shrink o-flex--wrap c-br-footer-widget__animation-transition c-br-footer-widget__jackpot-padding",
                visibleSection === i ? "t-opacity--100" : "t-opacity--0"
              )}
            >
              {row.map((pot, idx) => (
                <Flex.Item key={idx}>
                  <PotItem
                    className="o-flex--1"
                    pot={pot}
                    formattedValue={formattedPotValue(pot)}
                  />
                </Flex.Item>
              ))}
            </Flex>
          ))}
        </Flex>
      </Flex>
    </div>
  );
}

type TPotItemProps = {
  formattedValue: string;
  pot: PotObject;
  className: string;
};

const PotItem = ({ formattedValue, pot, className }: TPotItemProps) => {
  const { icon, shortName, status } = pot;
  return (
    <Flex
      direction="horizontal"
      align="center"
      justify="center"
      spacing="sm"
      className={className}
    >
      <img
        className="t-border-r--circle"
        width={16}
        height={16}
        alt={`${shortName} icon`}
        src={icon}
      />
      <BlueRibbonJackpotValue
        status={status}
        size="xs"
        classes="u-font-weight-bold u-line-height--1 text-white"
        tag="span"
      >
        <Text
          size="2xs"
          tag="span"
          className="u-text-transform-uppercase text-grey-50 u-margin-x--sm"
        >
          {shortName}
        </Text>
        {formattedValue}
      </BlueRibbonJackpotValue>
    </Flex>
  );
};
