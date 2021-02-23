// @flow
import * as React from "react";
import { ModalHeader } from "../RSModalHeader";

type ModalContentSkinProps = {
  // @ts-expect-error ts-migrate(8020) FIXME: JSDoc types can only be used inside documentation ... Remove this comment to see the full error message
  t: ?{
    reality_check_feature_title: string,
  },
  dismissModal: () => void,
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
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
      <div className="u-padding-x--2xlg u-padding-bottom--2xlg u-overflow-y--auto">
        {props.children}
      </div>
    </>
  );
}
