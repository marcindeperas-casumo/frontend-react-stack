// @flow
import * as React from "react";
import { RealityCheckContainer } from "Components/Compliance/RealityCheck";
import { type ModalContentComponent } from "Components/RSModal";
import { ModalSkin } from "./ModalSkin";

type RealityCheckContent = {
  reality_check_feature_title: string,
};

export function RealityCheck(
  props: ModalContentComponent<RealityCheckContent>
) {
  return (
    <ModalSkin {...props}>
      <RealityCheckContainer onClickContinue={props.acceptModal} />
    </ModalSkin>
  );
}
