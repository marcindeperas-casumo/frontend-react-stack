import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { useInterval } from "react-use";
import * as React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import { formatCurrency } from "Utils";
import { useGameModelContext } from "Components/GamePage/Contexts";
import type { PotObject } from "./blueRibbonConsts";
import "./blueRibbonJackpotsFooterWidget.scss";

export function BlueRibbonJackpotsFooterWidget({
  normalizedPots,
}: {
  normalizedPots: Array<PotObject>;
}) {
  const locale = useLocale();
  const currency = useSelector(currencySelector);
  const [visibleSection, setVisibleSection] = React.useState(0);

  const formatttedPotValue = pot => {
    return formatCurrency({
      currency,
      locale,
      value: pot.value,
    });
  };

  useInterval(() => {
    setVisibleSection(x => 1 - x);
  }, 5000);

  const { gameProviderModel } = useGameModelContext();
  React.useEffect(() => {
    setTimeout(() => {
      gameProviderModel.fitToParentSize();
    });
  }, [gameProviderModel]);

  const jackpotsRows = [normalizedPots.slice(0, 2), normalizedPots.slice(2, 4)];
  const splitExplanation = normalizedPots.find(pot => pot.sharedPot)?.sharedPot
    ?.splitExplanation;

  return (
    <div className="u-overflow--hidden bg-grey-90 o-flex-align--center o-flex-justify--center c-br-footer-widget__container-direction">
      <Flex
        direction="vertical"
        className="u-overflow--hidden bg-grey-70 bg-opacity-50 c-br-footer-widget__container-height c-br-footer-widget__container-width c-br-footer-widget__container-border-r"
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
                    formattedValue={formatttedPotValue(pot)}
                  />
                </Flex.Item>
              ))}
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Text
        size="2xs"
        className="u-margin--none text-grey-5 u-padding-x--md u-padding-y--sm u-text-align-center c-br-footer-widget__container-width"
      >
        {splitExplanation}
      </Text>
    </div>
  );
}

type TPotItemProps = {
  formattedValue: string;
  pot: PotObject;
  className: string;
};

const PotItem = ({ formattedValue, pot, className }: TPotItemProps) => {
  const { icon, shortName } = pot;
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
      <Text
        size="xs"
        tag="span"
        className="u-font-weight-bold u-line-height--1 text-white"
      >
        <Text
          size="2xs"
          tag="span"
          className="u-text-transform-uppercase text-grey-50 u-margin-x--sm"
        >
          {shortName}
        </Text>
        {formattedValue}
      </Text>
    </Flex>
  );
};
