// @flow
import * as React from "react";
import { ModalHeader } from "../RSModalHeader";

type ModalSkinProps = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  t: ?{
    modal_title: string,
  },
  dismissModal: () => void,
  closeAction?: () => void,
  hideCloseButton?: boolean,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
};

export function ModalSkin(props: ModalSkinProps) {
  const headerProps = props.hideCloseButton
    ? null
    : {
        showCloseButton: true,
        closeAction: props.closeAction || props.dismissModal,
      };

  return (
    <>
      <ModalHeader title={props.t?.modal_title} {...headerProps} />
      <div className="u-padding-x--2xlg@tablet u-padding-x--2xlg@desktop u-padding-bottom--2xlg@tablet u-padding-bottom--2xlg@desktop u-overflow-y--auto">
        {props.children}
      </div>
    </>
  );
}
