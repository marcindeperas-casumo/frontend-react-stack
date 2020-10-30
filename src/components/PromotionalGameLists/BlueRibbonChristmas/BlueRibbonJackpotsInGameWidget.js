// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Media from "@casumo/cmp-media";
import { useSelector } from "react-redux";
import { useLocale } from "Utils/hooks";
import { currencySelector } from "Models/handshake";
import { formatCurrency } from "Utils";
import type {
  JackpotWidgetContentPage,
  JackpotStatus,
} from "./blueRibbonConsts";

type BlueRibbonJackpotEntry = {
  value: number,
  label: string,
  status: JackpotStatus,
  potId: string,
  communityWinRatio: number,
  mainWinRatio: number,
};

export function BlueRibbonJackpotsInGameWidget({
  jackpots,
  t,
}: {
  jackpots: Array<BlueRibbonJackpotEntry>,
  t: JackpotWidgetContentPage,
}) {
  const locale = useLocale();
  const currency = useSelector(currencySelector);

  return (
    <Flex
      direction="vertical"
      align="start"
      className="u-padding--md t-border-r u-overflow--hidden t-background-grey-90"
    >
      <img alt="campaign name" src={t.campaign_logo} />
      <Flex
        direction="horizontal"
        align="stretch"
        justify="space-between"
        className="o-flex__item--no-shrink o-flex--wrap"
      >
        {jackpots.map(jackpot => {
          if (jackpot.communityWinRatio === 0 || jackpot.mainWinRatio === 0) {
            const cmsKey = jackpot.label.toLowerCase();

            return (
              <JackpotRow
                className="u-padding--md"
                key={jackpot.potId}
                formattedValue={formatCurrency({
                  locale,
                  currency,
                  value: jackpot.value,
                })}
                label={t[cmsKey]}
                image={t[`${cmsKey}_icon`]}
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
                value: jackpot.value * (jackpot.mainWinRatio / 100),
              }),
              label: t.mega_single_winner,
              image: t.mega_single_winner_icon,
              explanation: t.mega_single_winner_explanation,
            },
            {
              id: "community",
              formattedValue: formatCurrency({
                locale,
                currency,
                value: jackpot.value * (jackpot.communityWinRatio / 100),
              }),
              label: t.mega_community,
              image: t.mega_community_icon,
              explanation: t.mega_community_explanation,
            },
          ];

          return (
            <Flex
              key={jackpot.potId}
              direction="vertical"
              justify="space-between"
              className="t-border-r--md u-overflow--hidden u-width--full t-background-black"
            >
              <Flex
                key={jackpot.potId}
                direction="horizontal"
                justify="space-between"
              >
                {splittedPot.map(({ id, ...x }) => (
                  <JackpotRow
                    key={id}
                    className="u-padding--md u-padding-bottom"
                    {...x}
                  />
                ))}
              </Flex>
              <Text
                size="2xs"
                className="u-margin--none u-font-weight-bold t-color-grey-50 u-padding-x--md u-padding-bottom--md"
              >
                {t.jackpot_split_explanation}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
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
    <Media
      spacing="default"
      className={className}
      renderImage={() => (
        <img
          className="u-display--block t-border-r--circle"
          width={40}
          height={40}
          alt=""
          src={image}
        />
      )}
      renderText={() => (
        <>
          <Text
            size="2xs"
            className="u-margin--none u-font-weight-bold u-text-transform-uppercase t-color-grey-50"
          >
            {label}
          </Text>
          <Text
            size="xs"
            className="u-margin--none u-font-weight-bold t-color-white"
          >
            {formattedValue}
          </Text>
          {explanation && (
            <Text size="2xs" className="u-margin--none t-color-grey-50">
              {explanation}
            </Text>
          )}
        </>
      )}
    />
  );
}
