/* @flow */
import React from "react";
import type { Node } from "react";
import { ActiveModalsQuery, CloseModalMutation } from "Features/sports/state";
import ChooseFavouritesOverlay from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal";
import ChooseFavouriteCompetitionsOverlay from "Features/sports/components/EditFavouriteCompetitionsModal";
import "./Modals.scss";

const modalsMap: { [Modal]: any } = {
  CHOOSE_FAVOURITES: ChooseFavouritesOverlay,
  CHOOSE_FAVOURITE_COMPETITIONS: ChooseFavouriteCompetitionsOverlay,
};

export const ModalsArea = ({ children }: { children: Node }) => (
  <div className="c-modals">
    {/* Backdrop container */}
    <div className="c-modals-fade" />

    {children}
  </div>
);

const setScrollingEnabled = (isEnabled: boolean) => {
  const root = document.querySelector(":root");
  if (root) {
    if (isEnabled) {
      root.removeAttribute("style");
    } else {
      root.style.setProperty("--scroll-y-overflow", "hidden");
    }
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
                const ModalComponent = modalsMap[activeModal];

                return (
                  <CloseModalMutation
                    key={activeModal}
                    variables={{ modal: activeModal }}
                  >
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
