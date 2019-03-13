// @flow
import * as React from "react";
import FavouriteCompetitionsSelectorModal from "Features/sports/components/FavouriteCompetitionsSelectorModal";
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

  showCompetitionSelectorFor = (id: ?number) =>
    this.setState({
      selectingCompetitionsFor: id,
    });

  hideCompetitionSelector = () => this.showCompetitionSelectorFor(null);

  get isSelectingCompetitions() {
    return !!this.state.selectingCompetitionsFor;
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
              onCancel={this.hideCompetitionSelector}
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
