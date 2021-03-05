import * as React from "react";
import { ModalHeader } from "../RSModalHeader";

type ModalSkinProps = {
  t:
    | {
        modal_title: string;
      }
    | undefined;
  dismissModal: () => void;
  closeAction?: () => void;
  hideCloseButton?: boolean;
  children: React.ReactNode;
};

export function ModalSkin(props: ModalSkinProps) {
  return (
    <>
      {props.hideCloseButton ? (
        <ModalHeader title={props.t?.modal_title} />
      ) : (
        <ModalHeader
          title={props.t?.modal_title}
          showCloseButton
          closeAction={props.closeAction || props.dismissModal}
        />
      )}
      <div className="u-padding-x--2xlg@tablet u-padding-x--2xlg@desktop u-padding-bottom--2xlg@tablet u-padding-bottom--2xlg@desktop u-overflow-y--auto">
        {props.children}
      </div>
    </>
  );
}
