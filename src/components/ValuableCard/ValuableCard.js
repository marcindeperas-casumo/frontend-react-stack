// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import { VALUABLE_TYPES } from "Models/valuables/valuables.constants";
import ValuableCardBackground from "./ValuableCardBackground";
import "./ValuableCard.scss";

type ValuableType = $Values<VALUABLE_TYPES>;

type Props = {
  title: string,
  valuableType: ValuableType,
};

class ValuableCard extends PureComponent<Props> {
  render() {
    const { title, valuableType } = this.props;

    return (
      <Flex
        className="c-valuable-card u-drop-shadow t-background-white t-border-r--16 u-padding"
        justify="center"
        direction="vertical"
      >
        <Flex.Block>
          {/*
            TODO:
            -> to rename this to card header
            -> spread props
          */}
          <ValuableCardBackground valuableType={valuableType} />
        </Flex.Block>
        <Flex.Item className="c-valuable-card__content u-text-align-center">
          <div className="t-color-grey-dark-2 u-font-weight-bold">{title}</div>
        </Flex.Item>
      </Flex>
    );
  }
}

export default ValuableCard;
