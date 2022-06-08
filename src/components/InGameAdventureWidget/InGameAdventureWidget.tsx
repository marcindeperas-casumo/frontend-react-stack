import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import { useSelector } from "react-redux";
import cx from "classnames";
import type { BeltType } from "Models/adventure";
import { marketSelector } from "Models/handshake";
import { ProgressBar } from "Components/Progress";
import { CasumoAvatar } from "Components/CasumoAvatar";
import BonusValuableIcon from "./bonusValuable.svg";

type Props = {
  level: number;
  points: number;
  inBonusMode?: boolean;
  belt: BeltType;
  pointsRequiredForNextLevel: number;
  progressPercentage: number;
};

export const InGameAdventureWidget = ({
  level,
  points,
  belt,
  inBonusMode = false,
  pointsRequiredForNextLevel,
  progressPercentage,
}: Props) => {
  const market = useSelector(marketSelector);
  const isSwedishPlayer = market === "se_sv";
  const lastFlexItem = inBonusMode ? (
    <BonusValuableIcon />
  ) : (
    <>
      <Text className="text-grey-20 u-line-height--1" tag="div">
        {level}
      </Text>
      <Text className="text-grey-20" tag="div" size="2xs">
        LVL
      </Text>
    </>
  );

  if (isSwedishPlayer) {
    return null;
  }

  return (
    <div className="bg-grey-90 t-border-r u-padding-x--md u-padding-y--md">
      <Flex align="center">
        <Flex.Item className="u-width--xlg">
          <CasumoAvatar
            variant="sm"
            belt={belt}
            level={level}
            inBonusMode={inBonusMode}
          />
        </Flex.Item>
        <Flex.Block>
          <ProgressBar
            progress={progressPercentage}
            fillerClassNames="bg-grey-70 u-padding--none"
            trackClassNames="bg-teal-50"
          />
          <Flex
            justify="space-between"
            className="u-width--full u-font-sm u-padding-top--sm"
          >
            <Text className="text-grey-20" tag="div" size="xs">
              {points}
            </Text>
            <Text className="text-grey-50" tag="div" size="xs">
              {pointsRequiredForNextLevel}
            </Text>
          </Flex>
        </Flex.Block>
        <Flex.Item
          className={cx(
            "u-text-align-center u-font-weight-bold u-margin-left--md",
            {
              "u-margin-bottom--sm": !inBonusMode,
            }
          )}
        >
          {lastFlexItem}
        </Flex.Item>
      </Flex>
    </div>
  );
};
