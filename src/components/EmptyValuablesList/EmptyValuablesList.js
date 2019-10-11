// @flow

import React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { default as EmptyValuablesImage } from "./empty-valuables-image.svg";

import "./EmptyValuablesList.scss";

type Props = {
  message: string,
};

export const EmptyValuablesList = (props: Props) => (
  <Flex direction="vertical" align="center">
    <div className="c-empty-valuables-list-image">
      <EmptyValuablesImage />
    </div>
    <Text
      className="u-margin-top t-color-grey-light-1 u-font-weight-bold"
      tag="span"
    >
      {props.message}
    </Text>
  </Flex>
);
