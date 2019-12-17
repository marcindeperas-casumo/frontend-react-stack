// @flow
import * as React from "react";
import { RealityCheckContainer } from "Components/Compliance/RealityCheck";
import { type ModalContentComponent } from "Components/RSModal";
import { RealityCheckModalLayout } from "./RealityCheckModalLayout";

type RealityCheckContent = {
  reality_check_feature_title: string,
};

export function RealityCheck(
  props: ModalContentComponent<RealityCheckContent>
) {
  if (!props.t) {
    return null;
  }

  return (
    <RealityCheckModalLayout {...props}>
      <RealityCheckContainer onClickContinue={props.acceptModal} {...props} />
    </RealityCheckModalLayout>
  );
}
