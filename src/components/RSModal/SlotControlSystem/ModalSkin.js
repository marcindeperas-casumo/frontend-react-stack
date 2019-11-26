// @flow
import * as React from "react";
import { ModalHeader } from "../RSModalHeader";

type ModalSkinProps = {
  t: ?{
    modal_title: string,
  },
  dismissModal: () => void,
  children: React.Node,
};

export function ModalSkin(props: ModalSkinProps) {
  return (
    <>
      <ModalHeader
        title={props.t?.modal_title}
        showCloseButton
        closeAction={props.dismissModal}
      />
      <div className="u-padding-x--2xlg@tablet u-padding-x--2xlg@desktop u-padding-bottom--2xlg@tablet u-padding-bottom--2xlg@desktop u-overflow-y--auto">
        {props.children}
      </div>
    </>
  );
}
