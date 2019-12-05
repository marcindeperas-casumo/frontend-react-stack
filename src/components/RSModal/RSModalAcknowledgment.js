// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Button from "@casumo/cmp-button";

type Props = {
  onPress: () => void,
  title: string,
};

export function ModalAcknowledgment(props: Props) {
  return (
    <Flex className="c-rsmodal__acknowledgment-button-position u-padding--md u-position-sticky--top t-background-white">
      <Button variant="primary" className="o-flex--1" onClick={props.onPress}>
        {props.title}
      </Button>
    </Flex>
  );
}
