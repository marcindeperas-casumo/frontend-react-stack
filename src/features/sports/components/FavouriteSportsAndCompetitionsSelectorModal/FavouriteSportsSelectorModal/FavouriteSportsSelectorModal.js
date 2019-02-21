// @flow
import React from "react";
import Modal from "Components/Modal";

import { SetFavouritesMutation } from "Features/sports/state";

import FavouriteSportsSelector from "../FavouriteSportsSelector";
import StageFavouritesConsumer from "../StageFavouritesContext/StageFavouritesConsumer";

import ModalButtonFooter from "Features/sports/components/ModalButtonFooter";
import {
  DictionaryTerm,
  PluralisableDictionaryTerm,
} from "Features/sports/components/DictionaryTerm";

type Props = {
  onClose: () => void,
  onAddCompetition: (id: number) => void,
};

const FavouriteSportsSelectorModal = ({ onClose, onAddCompetition }: Props) => (
  <StageFavouritesConsumer>
    {api => {
      const selectedSportsCount = api.getSelectedSportsCount();
      const modalFooterButton =
        selectedSportsCount === 0 ? null : (
          <SetFavouritesMutation variables={{ ids: api.getSelectedIds() }}>
            {setFavouriteGroups => (
              <ModalButtonFooter
                onClick={() => {
                  setFavouriteGroups();
                  onClose();
                }}
              >
                <PluralisableDictionaryTerm
                  termKey="favourite-sports-selector.button"
                  replacements={{ sportsCount: selectedSportsCount }}
                  isPlural={selectedSportsCount > 1}
                />
              </ModalButtonFooter>
            )}
          </SetFavouritesMutation>
        );

      return (
        <Modal
          header={<DictionaryTerm termKey="favourite-sports-selector.title" />}
          onClose={onClose}
          className="t-background-white"
          dismissType={api.isFirstTimeSelectingFavourites ? "none" : "back"}
          footer={modalFooterButton}
        >
          <FavouriteSportsSelector
            showCompetitionIntro={api.isFirstTimeSelectingFavouriteCompetitions}
            onAddCompetition={onAddCompetition}
          />
        </Modal>
      );
    }}
  </StageFavouritesConsumer>
);

export default FavouriteSportsSelectorModal;
