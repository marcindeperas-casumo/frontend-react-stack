import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import { formatCurrency } from "Utils";
import { useGameModelContext } from "Components/GamePage/Contexts";
import type { PotObject } from "./blueRibbonConsts";
import "./blueRibbonJackpotsFooterWidget.scss";

export function BlueRibbonJackpotsFooterWidgetDesktop({
  normalizedPots,
}: {
  normalizedPots: Array<PotObject>;
}) {
  const locale = useLocale();
  const currency = useSelector(currencySelector);

  const formattedPotValue = pot => {
    return formatCurrency({
      currency,
      locale,
      value: pot.value,
    });
  };

  const { gameProviderModel } = useGameModelContext();
  React.useEffect(() => {
    setTimeout(() => {
      gameProviderModel.fitToParentSize();
    });
  }, [gameProviderModel]);

  const jackpotsRows = [normalizedPots];

  return (
    <div className="test-bogdan u-overflow--hidden bg-grey-90 o-flex-align--center o-flex-justify--center c-br-footer-widget__container-direction">
      {jackpotsRows.map((row, i) => (
        <Flex
          key={i}
          direction="horizontal"
          align="center"
          justify="center"
          spacing="lg"
          className={classNames(
            "o-flex__item--no-shrink o-flex--wrap c-br-footer-widget__animation-transition c-br-footer-widget__jackpot-padding"
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
