// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { type BeltType } from "Models/adventure";
import { ProgressBar } from "Components/Progress";
import { CasumoAvatar } from "Components/CasumoAvatar";
import BonusValuableIcon from "./bonusValuable.svg";

type Props = {
  level: number,
  points: number,
  inBonusMode: boolean,
  belt: BeltType,
  pointsRequiredForNextLevel: number,
  progressPercentage: number,
};

export const InGameAdventureWidget = ({
  level,
  points,
  belt,
  inBonusMode,
  pointsRequiredForNextLevel,
  progressPercentage,
}: Props) => {
  const lastFlexItem = inBonusMode ? (
    <BonusValuableIcon />
  ) : (
    <>
      <Text className="t-color-grey-20 u-line-height--1" tag="div">
        {level}
      </Text>
      <Text className="t-color-grey-20" tag="div" size="2xs">
        LVL
      </Text>
    </>
  );

  return (
    <div className="t-background-grey-90 t-border-r u-padding-x--md u-padding-y--md">
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
            fillerClassNames="t-background-grey-70 u-padding--none"
            trackClassNames="t-background-teal-50"
          />
          <Flex
            justify="space-between"
            className="u-width--full u-font-sm u-padding-top--sm"
          >
            <Text className="t-color-grey-20" tag="div" size="xs">
              {points}
            </Text>
            <Text className="t-color-grey-50" tag="div" size="xs">
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
