//@flow
import React, { type Node } from "react";
import classNames from "classnames";
import { AbstractModal } from "Components/AbstractModal";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
import { ORIENTATION_VALUES } from "Components/ResponsiveLayout/ResponsiveLayout.types";
import "./ValuableDetails.scss";

type Props = {
  /** Should this view be displayed? */
  isOpen: boolean,
  /** Close button callback */
  onClose: () => void,
  valuableDetails: ValuableDetails_PlayerValuable,
  children: Node,
};

export const ValuableDetailsWithModal = ({
  isOpen,
  onClose,
  children,
  ...props
}: Props) => {
  const ValuableModal = ({ className }) => (
    <AbstractModal
      isOpen={isOpen}
      hideModal={onClose}
      className={classNames("c-valuable-details-modal", className)}
      closeTimeoutMS={100}
    >
      <ValuableDetailsContainer {...props}>{children}</ValuableDetailsContainer>
    </AbstractModal>
  );

  return (
    <>
      <Desktop>
        <ValuableModal className="c-valuable-details-modal--desktop" />
      </Desktop>
      <Mobile orientation={ORIENTATION_VALUES.LANDSCAPE}>
        <ValuableModal className="c-valuable-details-modal--mobile-landscape" />
      </Mobile>
      <Mobile orientation={ORIENTATION_VALUES.PORTRAIT}>
        <ValuableModal className="c-valuable-details-modal--mobile-portrait" />
      </Mobile>
    </>
  );
};
