//@flow
import React, { type Node } from "react";
import { AbstractModal } from "Components/AbstractModal";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import type { ValuableDetailsProps } from "Models/valuables";
import "./ValuableDetails.scss";

type Props = ValuableDetailsProps & {
  /** Should this view be displayed? */
  isOpen: boolean,
  /** Close button callback */
  onClose: () => void,
  /** Host container for modal (used in stories) */
  // parentSelector?: () => void,
  /** Close modal delay  (used in stories)*/
  closeTimeoutMS?: number,
  children: Node,
};

const hostElementId = "portal-host-element";
const getParent = () => document.querySelector(`.root`);

export const ValuableDetailsWithModal = ({
  isOpen,
  onClose,
  closeTimeoutMS,
  children,
  ...props
}: Props) => {
  return (
    <AbstractModal
      isOpen={isOpen}
      hideModal={onClose}
      className="c-valuable-details-modal c-valuable-details-modal--mobile-landscape"
      arentSelector={() => getParent()}
      closeTimeoutMS={closeTimeoutMS}
    >
      <ValuableDetailsContainer {...props}>{children}</ValuableDetailsContainer>
    </AbstractModal>
  );
};
