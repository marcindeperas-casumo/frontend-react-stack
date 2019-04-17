// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import classNames from "classnames";
import { type BeltType } from "../../models/adventure";
import { beltToColourMap } from "./beltUtils";
import "./CasumoAvatar.scss";
import SumoAvatar from "./sumo-avatar.svg";

type Props = {
  /** Type of belt (rope, ..., sensei) */
  belt: BeltType,
};

export const getClassModifier = (belt: BeltType) => {
  const className = beltToColourMap[belt] || beltToColourMap.rope;

  return `t-color-${className}`;
};

export class CasumoAvatar extends PureComponent<Props> {
  render() {
    const { belt } = this.props;

    return (
      <div
        className={classNames(
          `c-casumo-avatar t-border-r--16 t-background-teal o-ratio`,
          getClassModifier(belt)
        )}
      >
        <Flex
          align="center"
          justify="center"
          className="o-ratio__content u-padding--md"
        >
          <SumoAvatar />
        </Flex>
      </div>
    );
  }
}
