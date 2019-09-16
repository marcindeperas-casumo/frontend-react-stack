//@flow
import React, { type Node } from "react";
import classNames from "classnames";
import useMedia from "react-use/lib/useMedia";
import { AbstractModal } from "Components/AbstractModal";
import { ValuableDetailsContainer } from "Components/ValuableDetails";
import { Desktop, Mobile } from "Components/ResponsiveLayout";
import { ORIENTATION_VALUES } from "Components/ResponsiveLayout/ResponsiveLayout.types";
import {
  mobileBreakpoint,
  desktopBreakpoint,
  getMediaQuery,
} from "Components/ResponsiveLayout/ResponsiveLayout.utils";
import "./ValuableDetails.scss";

type Props = {
  /** Should this view be displayed? */
  isOpen: boolean,
  /** Close button callback */
  onClose: () => void,
  valuableDetails: ValuableDetails_PlayerValuable,
  children: Node,
};

// mobile: 0,
// phablet: 480px,
// tablet: 768px,
// desktop: 1280px,

export const ValuableDetailsWithModal = ({
  isOpen,
  onClose,
  children,
  ...props
}: Props) => {
  const isMobile = useMedia(getMediaQuery(mobileBreakpoint));
  const isDesktop = useMedia(getMediaQuery(desktopBreakpoint));

  const modalClassName = isMobile
    ? "c-valuable-details-modal--mobile-portrait"
    : "c-valuable-details-modal--desktop";

  const ValuableModal = ({ className }: { className: string }) => (
    <AbstractModal
      isOpen={isOpen}
      hideModal={onClose}
      className={classNames("c-valuable-details-modal", className)}
      closeTimeoutMS={100}
    >
      <ValuableDetailsContainer {...props}>{children}</ValuableDetailsContainer>
    </AbstractModal>
  );

  return <ValuableModal className={modalClassName} />;
};
