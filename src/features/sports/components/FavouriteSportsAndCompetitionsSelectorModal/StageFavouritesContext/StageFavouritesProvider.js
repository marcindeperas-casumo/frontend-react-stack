// @flow
import * as React from "react";
import { when, assoc, propEq, eqProps, prop } from "ramda";
import gql from "graphql-tag";
import { getApolloContext } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import FavouriteCompetitionsSelectorModal from "Features/sports/components/FavouriteCompetitionsSelectorModal";
import tracker from "Services/tracker";
import { EVENT_PROPS, EVENTS } from "Src/constants";
import FavouriteSportsSelector from "../FavouriteSportsSelector/FavouriteSportsSelector";
import type { StageFavouritesAPI, Competition } from "./types";
import StageFavouritesContext from "./StageFavouritesContext";

type ProviderProps = {
  children: React.Node,
};

type ProviderState = StageFavouritesAPI;

export const FAVOURITE_SPORTS_SELECTOR_CONTEXT_COMPETITION_FIELDS_FRAGMENT = gql`
  fragment FavouriteSportsSelectorContext_Competition on EventGroup {
    id
    regionCode
    name
    ...FavouriteCompetitionsSelectorModal_Group
  }
  ${FavouriteCompetitionsSelectorModal.fragments.group}
`;

export const COMPETITION_SUGGESTIONS_QUERY = gql`
  query FavouriteSportsSelectorContextCompetitionSuggestions($id: Int!) {
    topCompetitions(groupIds: [$id], count: 5) {
      ...FavouriteSportsSelectorContext_Competition
    }
  }
  ${FAVOURITE_SPORTS_SELECTOR_CONTEXT_COMPETITION_FIELDS_FRAGMENT}
`;

export const FAVOURITE_SPORTS_SELECTOR_CONTEXT = gql`
  query FavouriteSportsSelectorContext {
    groups {
      id
      userFavourite
      canSelectSubgroups
      ...FavouriteSportsSelector_Group

      favouriteCompetitions {
        ...FavouriteSportsSelectorContext_Competition
      }
    }
  }

  ${FAVOURITE_SPORTS_SELECTOR_CONTEXT_COMPETITION_FIELDS_FRAGMENT}
  ${FavouriteSportsSelector.fragments.group}
`;

export const PLAYER_VERTICAL_QUERY = gql`
  query PlayerVertical {
    player {
      vertical
    }
  }
`;

class StageFavouritesProvider extends React.Component<
  ProviderProps,
  ProviderState
> {
  static contextType = getApolloContext();

  constructor(props: ProviderProps) {
    super(props);

    this.state = {
      sports: [],
      isFirstTimeSelectingFavourites: false,
      isFirstTimeSelectingFavouriteCompetitions: false,
      toggleFavouriteSport: this.toggleFavouriteSport,
      toggleAllSports: this.toggleAllSports,
      getSelectedSportsCount: this.getSelectedSportsCount,
      setFavouriteCompetitions: this.setFavouriteCompetitions,
      toggleFavouriteCompetition: this.toggleFavouriteCompetition,
      getSelectedIds: this.getSelectedIds,
      getSportNameById: this.getSportNameById,
      isSelected: this.isSelected,
      isSportsPlayer: false,
    };
  }

  componentDidMount() {
    this.fetchSports();
  }

  async fetchSports() {
    // fetch the initial data and store in state
    const {
      data: { groups: sports },
    }: {
      data: A.FavouriteSportsSelectorContext,
    } = await this.context.client.query({
      query: FAVOURITE_SPORTS_SELECTOR_CONTEXT,
      fetchPolicy: "network-only",
    });

    const {
      data: {
        player: { vertical },
      },
    }: {
      data: A.PlayerVertical,
    } = await this.context.client.query({
      query: PLAYER_VERTICAL_QUERY,
      fetchPolicy: "network-only",
    });

    // determine if this is the first time selecting favourites and favourite competitions
    // if all favourited competitions are empty
    this.setState({
      isFirstTimeSelectingFavourites:
        sports.filter(g => g.userFavourite).length === 0,
      isFirstTimeSelectingFavouriteCompetitions:
        sports.filter(
          g => g.favouriteCompetitions && g.favouriteCompetitions.length > 0
        ).length === 0,
      isSportsPlayer: vertical === "SPORTS",
    });

    // for all groups that allow subgroup selection, default the favourites
    // list to the top 5 competitions in that sport
    const promisesToCompetitionSuggestions = sports
      .filter(g => g.canSelectSubgroups && g.favouriteCompetitions.length === 0)
      .map(g => {
        return this.context.client
          .query<A.FavouriteSportsSelectorContextCompetitionSuggestions>({
            query: COMPETITION_SUGGESTIONS_QUERY,
            variables: { id: g.id },
          })
          .then(({ data }) => ({
            id: g.id,
            favouriteCompetitions: data.topCompetitions,
          }));
      });

    Promise.all(promisesToCompetitionSuggestions).then(results => {
      results.forEach(result => {
        const index = sports.findIndex(g => g.id === result.id);
        // eslint-disable-next-line fp/no-mutation
        sports[index].favouriteCompetitions = result.favouriteCompetitions;
      });

      this.setState({
        sports,
      });
    });
  }

  toggleFavouriteSport = (id: number) => {
    this.setState(state => ({
      sports: state.sports.map(sport => ({
        ...sport,
        userFavourite:
          id === sport.id ? !sport.userFavourite : sport.userFavourite,
      })),
    }));
    if (this.state.isFirstTimeSelectingFavourites) {
      const eventName = this.isSelected(id)
        ? EVENTS.MIXPANEL_SPORTS_ONBOARDING_FAVORITE_SPORT_DESELECTED
        : EVENTS.MIXPANEL_SPORTS_ONBOARDING_FAVORITE_SPORT_SELECTED;
      const data = {
        [EVENT_PROPS.SPORTS_ID]: id,
        [EVENT_PROPS.SPORTS_NAME]: this.getSportNameById(id),
      };
      tracker.track(eventName, data);
    }
  };

  toggleAllSports = () => {
    this.setState(state => {
      const areAllSelected =
        this.getSelectedSportsCount() === state.sports.length;

      return {
        sports: state.sports.map(sport => ({
          ...sport,
          userFavourite: !areAllSelected,
        })),
      };
    });
    if (this.state.isFirstTimeSelectingFavourites) {
      tracker.track(
        EVENTS.MIXPANEL_SPORTS_ONBOARDING_FAVORITE_SPORT_SELECTED_ALL,
        {}
      );
    }
  };

  getSelectedSportsCount = () => {
    return this.state.sports.filter(g => g.userFavourite).length;
  };

  setFavouriteCompetitions = (
    sportId: number,
    competitions: Array<Competition>
  ) => {
    this.setState(state => ({
      sports: state.sports.map(
        when(
          propEq("id", sportId),
          assoc("favouriteCompetitions", competitions)
        )
      ),
    }));
    if (this.state.isFirstTimeSelectingFavourites) {
      tracker.track(EVENTS.MIXPANEL_SPORTS_ONBOARDING_CHOSE_LEAGUES, {
        [EVENT_PROPS.LEAGUES_SELECTED]: competitions,
        [EVENT_PROPS.LEAGUES_SELECTED_NUMBER]: competitions.length,
      });
    }
  };

  toggleFavouriteCompetition = (sportId: number, competition: Competition) => {
    // either add or remove competition from favourite competitions depending on whether its already in the list
    this.setState(state => ({
      sports: state.sports.map(sport => {
        if (sportId === sport.id) {
          const existingCompetition = sport.favouriteCompetitions.find(
            eqProps("id", competition)
          );

          return {
            ...sport,
            favouriteCompetitions: existingCompetition
              ? sport.favouriteCompetitions.filter(
                  c => c.id !== existingCompetition.id
                )
              : [...sport.favouriteCompetitions, competition],
          };
        }

        return sport;
      }),
    }));
    if (this.state.isFirstTimeSelectingFavourites) {
      const eventName = this.isSelected(competition.id)
        ? EVENTS.MIXPANEL_SPORTS_ONBOARDING_COMPETITION_DESELECTED
        : EVENTS.MIXPANEL_SPORTS_ONBOARDING_COMPETITION_SELECTED;
      const data = {
        [EVENT_PROPS.SPORTS_ID]: sportId,
        [EVENT_PROPS.SPORTS_NAME]: this.getSportNameById(sportId),
        [EVENT_PROPS.COMPETITION_ID]: competition.id,
        [EVENT_PROPS.COMPETITION_NAME]: competition.name,
      };
      tracker.track(eventName, data);
    }
  };

  getSelectedIds = (): Array<number> => {
    return this.state.sports.reduce(
      (selectedIds, sport) => [
        ...selectedIds,
        // add sport if favourited
        ...(sport.userFavourite ? [sport.id] : []),
        // add favourite competitions for this sport
        ...sport.favouriteCompetitions.map(prop("id")),
      ],
      []
    );
  };

  getSportNameById = (sportId: number): string => {
    const sport = this.state.sports.find(s => s.id === sportId);
    return sport ? sport.name : "";
  };

  isSelected = (id: number): boolean => {
    return this.getSelectedIds().includes(id);
  };

  render() {
    return (
      <StageFavouritesContext.Provider value={this.state}>
        {this.props.children}
      </StageFavouritesContext.Provider>
    );
  }
}

export default StageFavouritesProvider;
