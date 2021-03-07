// @flow

import * as React from "react";
import { gql } from "@apollo/client";
import * as A from "Types/apollo";
import { SportsModal } from "Features/sports/components/SportsModal";
import ModalButtonFooter from "Features/sports/components/ModalButtonFooter";
import {
  DictionaryTerm,
  PluralisableDictionaryTerm,
} from "Features/sports/components/DictionaryTerm";
import { EVENT_PROPS, EVENTS } from "Src/constants";
import tracker from "Services/tracker";
import { FavouriteCompetitionsSelector } from "./FavouriteCompetitionsSelector";

type SelectedCompetitions = Array<A.FavouriteCompetitionsSelectorModal_Group>;

type Props = {
  onClose: () => void,
  onBack?: () => void,
  onSave: SelectedCompetitions => void,
  initiallySelectedCompetitions: SelectedCompetitions,
  groupId: number,
  groupName?: string,
  isOnboarding?: boolean,
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

  toggleCompetition = (group: A.FavouriteCompetitionsSelectorModal_Group) => {
    const trackToggleCompetition = () => {
      if (this.props.isOnboarding) {
        const eventName = this.isCompetitionSelected(group.id)
          ? EVENTS.MIXPANEL_SPORTS_ONBOARDING_LEAGUE_SELECTED
          : EVENTS.MIXPANEL_SPORTS_ONBOARDING_LEAGUE_DESELECTED;
        const data = {
          [EVENT_PROPS.SPORTS_ID]: this.props.groupId,
          [EVENT_PROPS.SPORTS_NAME]: this.props.groupName,
          [EVENT_PROPS.COMPETITION_ID]: group.id,
          // $FlowFixMe
          [EVENT_PROPS.COMPETITION_NAME]: group.name,
        };
        tracker.track(eventName, data);
      }
    };

    this.setState(
      state => ({
        selectedCompetitions: this.isCompetitionSelected(group.id)
          ? state.selectedCompetitions.filter(c => c.id !== group.id)
          : [...state.selectedCompetitions, group],
      }),
      trackToggleCompetition
    );
  };

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
            groupName={this.props.groupName}
            isOnboarding={this.props.isOnboarding}
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
