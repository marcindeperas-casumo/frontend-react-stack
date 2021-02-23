//@flow
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../node_modules/@types/react"' has ... Remove this comment to see the full error message
import React, { type Node } from "react";
import * as A from "Types/apollo";
import { AbstractModal } from "Components/AbstractModal";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import "./ValuableDetails.scss";

type Props = {
  /** Should this view be displayed? */
  isOpen: boolean,
  /** Close button callback */
  onClose: () => void,
  valuableDetails: A.ValuableDetails_PlayerValuable,
  children: Node,
};

export const ValuableDetailsWithModal = ({
  isOpen,
  onClose,
  children,
  ...props
}: Props) => (
  <AbstractModal
    isOpen={isOpen}
    hideModal={onClose}
    className="c-valuable-details-modal u-height--full u-width--full t-border-r--md u-overflow--hidden"
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    closeTimeoutMS={100}
  >
    <ValuableDetailsContainer {...props}>{children}</ValuableDetailsContainer>
  </AbstractModal>
);
