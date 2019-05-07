// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { type BeltType, isMaxLevel } from "Models/adventure";
import { beltToColourMap } from "./beltUtils";
import "./CasumoAvatar.scss";
import SumoAvatar from "./sumo-avatar.svg";
import SenseiAvatar from "./sensei-avatar.svg";

type Props = {
  level: number,
  belt: BeltType,
  backgroundColour: string,
};

export class CasumoAvatar extends PureComponent<Props> {
  render() {
    const { belt, level, backgroundColour } = this.props;

    return (
      <div
        className={classNames(
          `c-casumo-avatar t-border-r--16 o-ratio`,
          getBackgroundColourClassModifier(backgroundColour),
          getClassModifierByBelt(belt)
        )}
      >
        <Flex
          align="center"
          justify="center"
          className="o-ratio__content u-padding--md"
        >
          {isMaxLevel(level) ? <SenseiAvatar /> : <SumoAvatar />}
        </Flex>
      </div>
    );
  }

  static defaultProps = {
    belt: "rope",
    level: 1,
    backgroundColour: "teal",
  };
}

export function getClassModifierByBelt(belt: BeltType): string {
  const className = beltToColourMap[belt] || beltToColourMap.rope;

  return `t-color-${className}`;
}
export function getBackgroundColourClassModifier(
  backgroundColour: string
): string {
  return `t-background-${backgroundColour}`;
}
