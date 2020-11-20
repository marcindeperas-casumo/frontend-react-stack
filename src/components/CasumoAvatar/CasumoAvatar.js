// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import cx from "classnames";
import { type BeltType, isMaxLevel } from "Models/adventure";
import { beltToColorMap } from "./beltUtils";
import SumoAvatar from "./sumo-avatar.svg";
import SumoAvatarSm from "./sumo-avatar-sm.svg";
import SenseiAvatar from "./sensei-avatar.svg";

type Props = {
  /** Type of belt (rope, ..., sensei) */
  belt?: BeltType,
  inBonusMode?: boolean,
  level?: number,
  variant?: "sm" | "default",
};

const AVATAR_CLASS_NAMES = "u-height--full u-width--full";

export function CasumoAvatar({
  belt = "rope",
  inBonusMode = false,
  level = 1,
  variant = "default",
}: Props) {
  const backgroundColor = getBackgroundColor(inBonusMode, level);
  const isSmall = variant === "sm";
  const reachedMaxLevel = isMaxLevel(level, inBonusMode);
  const ActualSumoAvatar = R.cond([
    [R.always(isSmall), R.always(SumoAvatarSm)],
    [R.always(reachedMaxLevel), R.always(SenseiAvatar)],
    [R.T, R.always(SumoAvatar)],
  ])();

  return (
    <div
      className={cx(
        "c-casumo-avatar t-border-r--md o-ratio",
        getClassModifierByBelt(belt),
        {
          [`t-background-${backgroundColor}`]: !isSmall,
        }
      )}
    >
      <Flex
        align="center"
        justify="center"
        className={cx("o-ratio__content", {
          "u-padding--md": !isSmall,
        })}
      >
        <ActualSumoAvatar className={AVATAR_CLASS_NAMES} />
      </Flex>
    </div>
  );
}

export function getClassModifierByBelt(belt: BeltType): string {
  const className = beltToColorMap[belt] || beltToColorMap.rope;

  return `t-color-${className}`;
}

function getBackgroundColor(inBonusMode: boolean, level: number): string {
  if (isMaxLevel(level, inBonusMode)) {
    return "yellow-30";
  }
  if (inBonusMode) {
    return "purple-5";
  }

  return "teal-50";
}
