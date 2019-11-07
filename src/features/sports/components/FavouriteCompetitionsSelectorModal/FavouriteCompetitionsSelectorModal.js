// @flow

import * as React from "react";
import gql from "graphql-tag";
import { SportsModal } from "Features/sports/components/SportsModal";
import ModalButtonFooter from "Features/sports/components/ModalButtonFooter";
import {
  DictionaryTerm,
  PluralisableDictionaryTerm,
} from "Features/sports/components/DictionaryTerm";
import { FavouriteCompetitionsSelector } from "./FavouriteCompetitionsSelector";

type SelectedCompetitions = Array<A.FavouriteCompetitionsSelectorModal_Group>;

type Props = {
  onClose: () => void,
  onBack?: () => void,
  onSave: SelectedCompetitions => void,
  initiallySelectedCompetitions: SelectedCompetitions,
  groupId: number,
};

type State = {
  selectedCompetitions: $ElementType<Props, "initiallySelectedCompetitions">,
};

export default class FavouriteCompetitionsSelectorModal extends React.Component<
  Props,
  State
> {
  state = {
    selectedCompetitions: this.props.initiallySelectedCompetitions,
  };

  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.initiallySelectedCompetitions !==
      this.props.initiallySelectedCompetitions
    ) {
      // group has changed so set state to new selectedGroups
      this.setState({
        selectedCompetitions: this.props.initiallySelectedCompetitions,
      });
    }
  }

  isCompetitionSelected = (groupId: number): boolean => {
    return Boolean(this.state.selectedCompetitions.find(c => c.id === groupId));
  };

  toggleCompetition = (group: A.FavouriteCompetitionsSelectorModal_Group) =>
    this.setState(state => ({
      selectedCompetitions: this.isCompetitionSelected(group.id)
        ? state.selectedCompetitions.filter(c => c.id !== group.id)
        : [...state.selectedCompetitions, group],
    }));

  onSave = () => {
    this.props.onSave(this.state.selectedCompetitions);
  };

  render() {
    const selectedCompetitionsCount = this.state.selectedCompetitions.length;

    return (
      <SportsModal>
        <SportsModal.Header
          onClose={this.props.onClose}
          onBack={this.props.onBack}
        >
          <DictionaryTerm termKey="favourite-competitions-selector.title" />
        </SportsModal.Header>

        <SportsModal.Content>
          <FavouriteCompetitionsSelector
            groupId={this.props.groupId}
            isCompetitionSelected={this.isCompetitionSelected}
            toggleCompetition={this.toggleCompetition}
          />
        </SportsModal.Content>

        {selectedCompetitionsCount > 0 && (
          <SportsModal.Footer>
            <ModalButtonFooter onClick={this.onSave}>
              <PluralisableDictionaryTerm
                termKey="favourite-competitions-selector.button"
                replacements={{ competitionsCount: selectedCompetitionsCount }}
                isPlural={selectedCompetitionsCount > 1}
              />
            </ModalButtonFooter>
          </SportsModal.Footer>
        )}
      </SportsModal>
    );
  }

  static fragments = {
    group: gql`
      fragment FavouriteCompetitionsSelectorModal_Group on EventGroup {
        id
      }
    `,
  };
}
