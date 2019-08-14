//@flow
import React, { type Node } from "react";
import { AbstractModal } from "Components/AbstractModal";
import "./ValuableDetails.scss";

type Props = {
  /** Should this view be displayed? */
  isOpen: boolean,
  /** Close button callback */
  onClose: () => void,
  /** Host container for modal (used in stories) */
  // parentSelector?: () => void,
  /** Close modal delay  (used in stories)*/
  closeTimeoutMS?: number,
  renderValuableDetails: () => Node,
};

const hostElementId = "portal-host-element";
const getParent = () => document.querySelector(`#${hostElementId}`);

export const ValuableDetailsWithModal = ({
  isOpen,
  onClose,
  closeTimeoutMS,
  renderValuableDetails,
}: Props) => (
  <AbstractModal
    isOpen={isOpen}
    hideModal={onClose}
    className="c-valuable-details-modal c-abstract-modal--mobile-portrait"
    parentSelector={() => getParent()}
    closeTimeoutMS={closeTimeoutMS}
  >
    {renderValuableDetails()}
  </AbstractModal>
);
