// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Media from "@casumo/cmp-media";
import { useSelector } from "react-redux";
import { currencySelector } from "Models/handshake";
import { useLocale } from "Utils/hooks";
import { formatCurrency } from "Utils";
import {
  colors,
  jackpotWidgetWidth,
  type JackpotWidgetContentPage,
} from "./blueRibbonConsts";

type BlueRibbonJackpotEntry = {
  value: number,
  label: string,
  status: "HOT" | "WARM" | "CHILLY",
  potId: string,
  communityWinRatio: number,
  mainWinRatio: number,
};

type Props = {
  jackpots: Array<BlueRibbonJackpotEntry>,
  t: JackpotWidgetContentPage,
};

export function BlueRibbonJackpotsWidget({ jackpots, t }: Props) {
  const locale = useLocale();
  const currency = useSelector(currencySelector);

  if (jackpots.length === 0) {
    return null;
  }

  return (
    <Flex
      direction="vertical"
      className="o-flex__item--no-shrink u-padding t-border-r--md u-overflow--hidden"
      style={{
        backgroundColor: colors.jackpotWidgetPurpleLight,
        width: jackpotWidgetWidth,
      }}
    >
      {jackpots.map(jackpot => {
        if (jackpot.communityWinRatio === 0 || jackpot.mainWinRatio === 0) {
          const cmsKey = jackpot.label.toLowerCase();

          return (
            <JackpotRow
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
            className="t-border-r--md u-overflow--hidden"
            style={{ backgroundColor: colors.jackpotWidgetPurpleDark }}
          >
            {splittedPot.map(({ id, ...x }) => (
              <JackpotRow key={id} {...x} />
            ))}
          </Flex>
        );
      })}
    </Flex>
  );
}

type JackpotRowProps = {
  formattedValue: string,
  label: string,
  image: string,
  explanation?: string,
};
function JackpotRow({
  formattedValue,
  label,
  image,
  explanation,
}: JackpotRowProps) {
  return (
    <Media
      className="u-padding-x--md u-padding-y"
      renderImage={() => (
        <img
          className="u-display--block t-border-r--circle"
          width={56}
          height={56}
          alt=""
          src={image}
        />
      )}
      renderText={() => (
        <>
          <Text
            size="2xs"
            className="u-margin-bottom--none u-font-weight-bold u-text-transform-uppercase t-color-white"
          >
            {label}
          </Text>
          <Text
            size="md"
            className="u-margin-bottom--none u-font-weight-bold t-color-white"
          >
            {formattedValue}
          </Text>
          {explanation && (
            <Text size="2xs" className="u-margin-bottom--none t-color-purple-5">
              {explanation}
            </Text>
          )}
        </>
      )}
    />
  );
}
