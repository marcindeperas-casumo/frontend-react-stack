import Flex from "@casumo/cmp-flex";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";

type Props = {
  onPress: () => void;
  title: string;
};

export function ModalAcknowledgment(props: Props) {
  return (
    <Flex className="c-rsmodal__acknowledgment-button-position u-padding--md o-position--sticky t-background-white">
      <ButtonPrimary className="o-flex--1" onClick={props.onPress}>
        {props.title}
      </ButtonPrimary>
    </Flex>
  );
}
