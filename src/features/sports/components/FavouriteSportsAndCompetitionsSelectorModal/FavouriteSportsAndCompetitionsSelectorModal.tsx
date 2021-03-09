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
  selectingCompetitionsFor: number | undefined;
  selectingCompetitionsForName: string;
  isOnboarding: boolean;
};

type Props = {
  onClose: (e: any) => any;
};

class FavouriteSportsAndCompetitionsSelectorModal extends React.Component<
  Props,
  State
> {
  state = {
    selectingCompetitionsFor: null,
    selectingCompetitionsForName: "",
    isOnboarding: false,
  };

  showCompetitionSelectorFor = (
    id: number | undefined,
    name: string,
    isOnboarding: boolean
  ) => {
    const trackIntent = () => {
      if (isOnboarding) {
        const eventName = EVENTS.MIXPANEL_SPORTS_ONBOARDING_LEAGUE_INTENT;
        const data = {
          [EVENT_PROPS.SPORTS_ID]: id,
          [EVENT_PROPS.SPORTS_NAME]: name,
        };
        tracker.track(eventName, data);
      }
    };

    this.setState(
      {
        selectingCompetitionsFor: id,
        selectingCompetitionsForName: name,
        isOnboarding: isOnboarding,
      },
      trackIntent
    );
  };

  hideCompetitionSelector = () =>
    this.showCompetitionSelectorFor(null, "", false);

  get isSelectingCompetitions() {
    return Boolean(this.state.selectingCompetitionsFor);
  }

  renderCompetitionsSelector = () => {
    const {
      selectingCompetitionsFor,
      selectingCompetitionsForName,
      isOnboarding,
    } = this.state;

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
              groupName={selectingCompetitionsForName}
              initiallySelectedCompetitions={initiallySelectedCompetitions}
              isOnboarding={isOnboarding}
              onBack={this.hideCompetitionSelector}
              // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
              onClose={this.props.onClose}
              onSave={selectedCompetitions => {
                if (selectingCompetitionsFor) {
                  setFavouriteCompetitions(
                    selectingCompetitionsFor,
                    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'SelectedCompetitions' is not ass... Remove this comment to see the full error message
                    selectedCompetitions
                  );
                }
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type '(e: any) => any' is not assignable to type '... Remove this comment to see the full error message
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
