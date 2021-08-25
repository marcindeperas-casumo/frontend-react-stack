import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import { formatCurrency } from "Utils";
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

  const jackpotsRows = normalizedPots;

  return (
    <div className="t-border-r-top-left u-overflow--hidden o-flex-align--center o-flex-justify--center">
      <Flex
        direction="horizontal"
        align="center"
        justify="center"
        spacing="lg"
        className={classNames(
          "o-flex__item--no-shrink o-flex--wrap c-br-footer-widget__animation-transition u-padding-left--lg u-padding-right--lg u-padding-bottom u-padding-top u-margin-right--md"
        )}
      >
        {jackpotsRows.map((pot, idx) => (
          <Flex.Item key={idx}>
            <PotItem pot={pot} formattedValue={formattedPotValue(pot)} />
          </Flex.Item>
        ))}
      </Flex>
    </div>
  );
}

type TPotItemProps = {
  formattedValue: string;
  pot: PotObject;
};

const PotItem = ({ formattedValue, pot }: TPotItemProps) => {
  const { icon, shortName, potTitleColor } = pot;
  return (
    <Flex direction="horizontal" align="center" justify="center" spacing="sm">
      <Flex.Item className="u-height--xlg">
        <img
          className="t-border-r--circle"
          width={32}
          height={32}
          alt={`${shortName} icon`}
          src={icon}
        />
      </Flex.Item>
      <Flex.Item>
        <Flex direction="vertical">
          <Text
            size="xs"
            tag="span"
            className={classNames("u-text-transform-uppercase", potTitleColor)}
          >
            {shortName}
          </Text>
          <Text
            size="xs"
            tag="span"
            className="u-font-weight-bold u-text-transform-uppercase u-line-height--1 text-white"
          >
            {formattedValue}
          </Text>
        </Flex>
      </Flex.Item>
    </Flex>
  );
};
