// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { useInterval } from "react-use";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import { formatCurrency } from "Utils";
import { useGameModelContext } from "Components/GamePage/Contexts";
import type {
  JackpotWidgetContentPage,
  JackpotStatus,
} from "./blueRibbonConsts";
import "./blueRibbonJackpotsFooterWidget.scss";

type BlueRibbonJackpotEntry = {
  value: number,
  label: string,
  status: JackpotStatus,
  potId: string,
  communityWinRatio: number,
  mainWinRatio: number,
};

export function BlueRibbonJackpotsFooterWidget({
  jackpots,
  t,
}: {
  jackpots: Array<BlueRibbonJackpotEntry>,
  t: JackpotWidgetContentPage,
}) {
  const locale = useLocale();
  const currency = useSelector(currencySelector);
  const [visibleSection, setVisibleSection] = React.useState(0);
  useInterval(() => {
    setVisibleSection(x => 1 - x);
  }, 5000);

  const { gameProviderModel } = useGameModelContext();
  React.useEffect(() => {
    setTimeout(() => {
      gameProviderModel.fitToParentSize();
    });
  }, [gameProviderModel]);

  const jackpotsSplit = [
    [jackpots[0], jackpots[1]].map(jackpot => {
      const cmsKey = jackpot.label.toLowerCase();

      return {
        key: jackpot.potId,
        formattedValue: formatCurrency({
          locale,
          currency,
          value: jackpot.value,
        }),
        label: t[`${cmsKey}_short`],
        image: t[`${cmsKey}_icon`],
      };
    }),
    [
      {
        key: "main",
        formattedValue: formatCurrency({
          locale,
          currency,
          value: jackpots[2].value * (jackpots[2].mainWinRatio / 100),
        }),
        label: t.mega_single_winner_short,
        image: t.mega_single_winner_icon,
      },
      {
        key: "community",
        formattedValue: formatCurrency({
          locale,
          currency,
          value: jackpots[2].value * (jackpots[2].communityWinRatio / 100),
        }),
        label: t.mega_community_short,
        image: t.mega_community_icon,
      },
    ],
  ];

  return (
    <div className="u-overflow--hidden t-background-grey-90 o-flex-align--center o-flex-justify--center c-br-footer-widget__container-direction">
      <Flex
        direction="vertical"
        className="u-overflow--hidden t-background-grey-70 t-opacity-background--50 c-br-footer-widget__container-height c-br-footer-widget__container-width c-br-footer-widget__container-border-r"
      >
        <Flex
          direction="vertical"
          className={classNames("c-br-footer-widget__animation-transition", {
            "c-br-footer-widget__transform-animation--reset": !visibleSection,
            "c-br-footer-widget__transform-animation": visibleSection,
          })}
        >
          {jackpotsSplit.map((section, i) => (
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
              {section.map(jackpot => (
                <Flex.Item key={jackpot.key}>
                  <JackpotRow className="o-flex--1" {...jackpot} />
                </Flex.Item>
              ))}
            </Flex>
          ))}
        </Flex>
      </Flex>
      <Text
        size="2xs"
        className="u-margin--none t-color-grey-5 u-padding-x--md u-padding-y--sm u-text-align-center c-br-footer-widget__container-width"
      >
        {t.jackpot_split_explanation}
      </Text>
    </div>
  );
}

type JackpotRowProps = {
  formattedValue: string,
  label: string,
  image: string,
  explanation?: string,
  className: string,
};
function JackpotRow({
  formattedValue,
  label,
  image,
  explanation,
  className,
}: JackpotRowProps) {
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
        alt={`${label} icon`}
        src={image}
      />
      <Text
        size="xs"
        tag="span"
        className="u-font-weight-bold u-line-height--1 t-color-white"
      >
        <Text
          size="2xs"
          tag="span"
          className="u-text-transform-uppercase t-color-grey-50 u-margin-x--sm"
        >
          {label}
        </Text>
        {formattedValue}
      </Text>
    </Flex>
  );
}
