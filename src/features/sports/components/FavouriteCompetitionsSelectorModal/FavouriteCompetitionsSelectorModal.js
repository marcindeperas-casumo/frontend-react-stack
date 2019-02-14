// @flow

import * as React from "react";
import gql from "graphql-tag";

import Modal from "Components/Modal";

import FavouriteCompetitionsSelector from "./FavouriteCompetitionsSelector";

import ModalButtonFooter from "Features/sports/components/ModalButtonFooter";
import {
  DictionaryTerm,
  PluralisableDictionaryTerm,
} from "Features/sports/components/DictionaryTerm";

type SelectedCompetitions = Array<FavouriteCompetitionsSelectorModal_Group>;

type Props = {
  onCancel: () => void,
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
    return !!this.state.selectedCompetitions.find(c => c.id === groupId);
  };

  toggleCompetition = (group: FavouriteCompetitionsSelectorModal_Group) =>
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
      <Modal
        header={
          <DictionaryTerm termKey="favourite-competitions-selector.title" />
        }
        onClose={this.props.onCancel}
        dismissType="back"
        className="t-background-white"
        footer={
          selectedCompetitionsCount === 0 ? null : (
            <ModalButtonFooter onClick={this.onSave}>
              <PluralisableDictionaryTerm
                termKey="favourite-competitions-selector.button"
                replacements={{ competitionsCount: selectedCompetitionsCount }}
                isPlural={selectedCompetitionsCount > 1}
              />
            </ModalButtonFooter>
          )
        }
      >
        <FavouriteCompetitionsSelector
          groupId={this.props.groupId}
          isCompetitionSelected={this.isCompetitionSelected}
          toggleCompetition={this.toggleCompetition}
        />
      </Modal>
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
