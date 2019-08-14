// //@flow
// import React, { type Node } from "react";
// import Flex from "@casumo/cmp-flex";
// import { AbstractModal } from "Components/AbstractModal";
// import "./ValuableDetails.scss";

// type Props = {
//   /** Should this view be displayed? */
//   isOpen: boolean,
//   /** Close button callback */
//   onClose: () => void,
//   /** Host container for modal (used in stories) */
//   parentSelector?: () => void,
//   /** Close modal delay  (used in stories)*/
//   closeTimeoutMS?: number,
//   children: Node,
//   renderButton?: () => Node,
// };

// export const ValuableDetailsModal = ({
//   isOpen,
//   onClose,
//   parentSelector,
//   closeTimeoutMS,
//   children,
//   renderButton = () => <div />,
// }: Props) => (
//   <AbstractModal
//     isOpen={isOpen}
//     hideModal={onClose}
//     className="c-valuable-details"
//     parentSelector={parentSelector}
//     closeTimeoutMS={closeTimeoutMS}
//   >
//     <Flex
//       justify="start"
//       direction="vertical"
//       align="center"
//       className="u-position-relative c-valuable-details__container"
//     >
//       {children}
//     </Flex>
//     {renderButton()}
//   </AbstractModal>
// );
