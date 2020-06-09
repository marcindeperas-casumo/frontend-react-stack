// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { type BeltType, isMaxLevel } from "Models/adventure";
import { beltToColorMap } from "./beltUtils";
import SumoAvatar from "./sumo-avatar.svg";
import SenseiAvatar from "./sensei-avatar.svg";

type Props = {
  /** Type of belt (rope, ..., sensei) */
  belt: BeltType,
  inBonusMode: boolean,
  level: number,
};

const AVATAR_CLASS_NAMES = "u-height--full u-width--full";

export class CasumoAvatar extends PureComponent<Props> {
  static defaultProps = {
    belt: "rope",
    inBonusMode: false,
    level: 1,
  };

  render() {
    const { belt, level, inBonusMode } = this.props;
    const backgroundColor = getBackgroundColor(inBonusMode, level);

    return (
      <div
        className={classNames(
          `c-casumo-avatar t-border-r--md o-ratio t-background-${backgroundColor}`,
          getClassModifierByBelt(belt)
        )}
      >
        <Flex
          align="center"
          justify="center"
          className="o-ratio__content u-padding--md"
        >
          {isMaxLevel(level, inBonusMode) ? (
            <SenseiAvatar className={AVATAR_CLASS_NAMES} />
          ) : (
            <SumoAvatar className={AVATAR_CLASS_NAMES} />
          )}
        </Flex>
      </div>
    );
  }
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
    return "violet";
  }

  return "turquoise";
}
