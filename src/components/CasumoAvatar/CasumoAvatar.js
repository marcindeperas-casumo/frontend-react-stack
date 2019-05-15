// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { type BeltType, isMaxLevel } from "Models/adventure";
import { beltToColorMap } from "./beltUtils";
import "./CasumoAvatar.scss";
import SumoAvatar from "./sumo-avatar.svg";
import SenseiAvatar from "./sensei-avatar.svg";

type Props = {
  /** Type of belt (rope, ..., sensei) */
  belt: BeltType,
  backgroundColor: string,
  level: number,
};

export class CasumoAvatar extends PureComponent<Props> {
  static defaultProps = {
    belt: "rope",
    level: 1,
    backgroundColor: "teal",
  };

  render() {
    const { belt, level, backgroundColor } = this.props;

    return (
      <div
        className={classNames(
          `c-casumo-avatar t-border-r--16 o-ratio t-background-${backgroundColor}`,
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
}

export function getClassModifierByBelt(belt: BeltType): string {
  const className = beltToColorMap[belt] || beltToColorMap.rope;

  return `t-color-${className}`;
}
