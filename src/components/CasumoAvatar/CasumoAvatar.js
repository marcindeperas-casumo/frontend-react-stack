// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { type BeltType, MAX_LEVEL } from "Models/adventure";
import { beltToColourMap } from "./beltUtils";
import "./CasumoAvatar.scss";
import SumoAvatar from "./sumo-avatar.svg";
import SenseiAvatar from "./sensei-avatar.svg";

type Props = {
  /** Type of belt (rope, ..., sensei) */
  level: number,
  belt: BeltType,
  backgroundColour?: string,
};

export const getClassModifierByBelt = (belt: BeltType) => {
  const className = beltToColourMap[belt] || beltToColourMap.rope;

  return `t-color-${className}`;
};
export const getBackgroundColourClassModifier = (backgroundColour: string) => {
  return `t-background-${backgroundColour}`;
};

const Avatar = (props: Props) => {
  if (props.level >= MAX_LEVEL) {
    return <SenseiAvatar />;
  }

  return <SumoAvatar />;
};

export class CasumoAvatar extends PureComponent<Props> {
  render() {
    const { belt, backgroundColour = "teal" } = this.props;

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
          <Avatar {...this.props} />
        </Flex>
      </div>
    );
  }
}
