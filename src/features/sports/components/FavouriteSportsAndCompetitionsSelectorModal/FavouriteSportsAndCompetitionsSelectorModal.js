// @flow
import * as React from "react";
import FavouriteCompetitionsSelectorModal from "Features/sports/components/FavouriteCompetitionsSelectorModal";
import { EVENT_PROPS, EVENTS } from "Src/constants";
import tracker from "Services/tracker";
import FavouriteSportsSelectorModal from "./FavouriteSportsSelectorModal";
import {
  StageFavouritesProvider,
  StageFavouritesConsumer,
} from "./StageFavouritesContext";

type State = {
  selectingCompetitionsFor: ?number,
};

type Props = {
  onClose: any => any,
};

class FavouriteSportsAndCompetitionsSelectorModal extends React.Component<
  Props,
  State
> {
  state = {
    selectingCompetitionsFor: null,
  };

  showCompetitionSelectorFor = (
    id: ?number,
    name: ?string,
    isOnboarding: ?boolean
  ) => {
    this.setState({
      selectingCompetitionsFor: id,
    });
    if (isOnboarding) {
      const eventName = EVENTS.MIXPANEL_SPORTS_ONBOARDING_LEAGUE_INTENT;
      const data = {
        [EVENT_PROPS.SPORTS_ID]: id,
        [EVENT_PROPS.SPORTS_NAME]: name,
      };
      tracker.track(eventName, data);
    }
  };

  hideCompetitionSelector = () => this.showCompetitionSelectorFor(null);

  get isSelectingCompetitions() {
    return Boolean(this.state.selectingCompetitionsFor);
  }

  renderCompetitionsSelector = () => {
    const { selectingCompetitionsFor } = this.state;

    return (
      <StageFavouritesConsumer>
        {({ sports, getSelectedSportsCount, setFavouriteCompetitions }) => {
          const selectedSport = sports.find(
            s => s.id === this.state.selectingCompetitionsFor
          );

          const initiallySelectedCompetitions = selectedSport
            ? selectedSport.favouriteCompetitions
            : [];

          return (
            <FavouriteCompetitionsSelectorModal
              groupId={selectingCompetitionsFor}
              initiallySelectedCompetitions={initiallySelectedCompetitions}
              onBack={this.hideCompetitionSelector}
              onClose={this.props.onClose}
              onSave={selectedCompetitions => {
                selectingCompetitionsFor &&
                  setFavouriteCompetitions(
                    selectingCompetitionsFor,
                    selectedCompetitions
                  );
                this.hideCompetitionSelector();
              }}
            />
          );
        }}
      </StageFavouritesConsumer>
    );
  };

  renderSportsSelector = () => (
    <FavouriteSportsSelectorModal
      onClose={this.props.onClose}
      onAddCompetition={this.showCompetitionSelectorFor}
    />
  );

  render() {
    return (
      <StageFavouritesProvider>
        {this.isSelectingCompetitions
          ? this.renderCompetitionsSelector()
          : this.renderSportsSelector()}
      </StageFavouritesProvider>
    );
  }
}

export default FavouriteSportsAndCompetitionsSelectorModal;
