/* @flow */
import React from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../../../node_modules/@types/react"... Remove this comment to see the full error message
import type { Node } from "react";
import {
  ActiveModalsQuery,
  CloseModalMutation,
} from "Features/sports/components/GraphQL";
import { MODAL_MAPPING } from "./Modals.config";
import "./Modals.scss";

export const ModalsArea = ({ children }: { children: Node }) => (
  <div className="c-modals">
    {/* Backdrop container */}
    <div className="c-modals-fade" />

    {children}
  </div>
);

const setScrollingEnabled = (isEnabled: boolean) => {
  const root = document.documentElement;

  if (root) {
    root.style.setProperty(
      "--scroll-y-overflow",
      isEnabled ? "auto" : "hidden"
    );
  }
};

class Modals extends React.Component<{}> {
  componentWillUnmount() {
    setScrollingEnabled(true);
  }

  render() {
    return (
      <ActiveModalsQuery>
        {({ activeModals }) => {
          const hasNoActiveModals = activeModals.length === 0;

          if (hasNoActiveModals) {
            setScrollingEnabled(true);
            return null;
          }

          setScrollingEnabled(false);

          return (
            <ModalsArea>
              {activeModals.map(activeModal => {
                const ModalComponent = MODAL_MAPPING[activeModal];

                return (
                  <CloseModalMutation
                    key={activeModal}
                    variables={{ modal: activeModal }}
                  >
                    {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
                    {closeModal => <ModalComponent onClose={closeModal} />}
                  </CloseModalMutation>
                );
              })}
            </ModalsArea>
          );
        }}
      </ActiveModalsQuery>
    );
  }
}

export default Modals;
