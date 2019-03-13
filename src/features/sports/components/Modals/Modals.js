/* @flow */
import React from "react";
import { ActiveModalsQuery, CloseModalMutation } from "Features/sports/state";
import ChooseFavouritesOverlay from "Features/sports/components/FavouriteSportsAndCompetitionsSelectorModal";
import ChooseFavouriteCompetitionsOverlay from "Features/sports/components/EditFavouriteCompetitionsModal";

const modalsMap: { [Modal]: any } = {
  CHOOSE_FAVOURITES: ChooseFavouritesOverlay,
  CHOOSE_FAVOURITE_COMPETITIONS: ChooseFavouriteCompetitionsOverlay,
};

const Modals = () => {
  return (
    <ActiveModalsQuery>
      {({ activeModals }) => {
        const hasNoActiveModals = activeModals.length === 0;

        return hasNoActiveModals
          ? null
          : activeModals.map(activeModal => {
              const ModalComponent = modalsMap[activeModal];

              return (
                <CloseModalMutation
                  key={activeModal}
                  variables={{ modal: activeModal }}
                >
                  {closeModal => <ModalComponent onClose={closeModal} />}
                </CloseModalMutation>
              );
            });
      }}
    </ActiveModalsQuery>
  );
};

export default Modals;
