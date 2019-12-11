// @flow
import * as React from "react";
import { ModalHeader } from "../RSModalHeader";

type ModalContentSkinProps = {
  t: ?{
    reality_check_feature_title: string,
  },
  dismissModal: () => void,
  children: React.Node,
};

export function RealityCheckModalLayout(props: ModalContentSkinProps) {
  return (
    <>
      <ModalHeader
        title={props.t?.reality_check_feature_title}
        showCloseButton
        closeAction={props.dismissModal}
      />
      <div className="u-padding-x--2xlg@tablet u-padding-bottom--2xlg@tablet u-padding-bottom--2xlg@desktop u-overflow-y--auto">
        {props.children}
      </div>
    </>
  );
}
