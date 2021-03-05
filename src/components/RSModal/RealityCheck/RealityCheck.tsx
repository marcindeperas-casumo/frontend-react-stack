import * as React from "react";
import { RealityCheckContainer } from "Components/Compliance/RealityCheck";
import type { ModalContentComponent } from "Components/RSModal";
import { RealityCheckModalLayout } from "./RealityCheckModalLayout";

type RealityCheckContent = {
  reality_check_feature_title: string;
};

export function RealityCheck(
  props: ModalContentComponent<RealityCheckContent>
) {
  if (!props.t) {
    return null;
  }

  return (
    <RealityCheckModalLayout {...props}>
      {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ t: RealityCheckContent; config: ModalConfi... Remove this comment to see the full error message */}
      <RealityCheckContainer onClickContinue={props.acceptModal} {...props} />
    </RealityCheckModalLayout>
  );
}
