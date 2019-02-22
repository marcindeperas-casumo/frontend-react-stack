/* @flow */
import * as React from "react";
import gql from "graphql-tag";

import StageFavouritesConsumer from "../StageFavouritesContext/StageFavouritesConsumer";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";

import Intro from "./FavouriteSportsSelectorIntro";
import Heading from "./FavouriteSportsSelectorHeading";
import ListItem from "./FavouriteSportsSelectorListItem";

type Props = {
  /** Whether the introduction to how to favourite competitions should be shown */
  showCompetitionIntro: boolean,
  /** What should be done when we want to edit competitions for this group */
  onAddCompetition: (groupId: number) => void,
};

const FavouriteSportsSelector = (props: Props) => (
  <StageFavouritesConsumer>
    {api => {
      const popularGroups = api.sports.filter(g => g.popular);
      const otherGroups = api.sports.filter(g => !g.popular);

      return (
        <>
          <Intro>
            <DictionaryTerm termKey="favourite-sports-selector.intro" />
          </Intro>

          <Heading>
            <DictionaryTerm termKey="favourite-sports-selector.heading.popular" />
          </Heading>
          {popularGroups.map(group => (
            <ListItem
              data-test="favourite-sports-selector-popular"
              key={group.id}
              group={group}
              showCompetitionIntro={props.showCompetitionIntro}
              onAddCompetition={props.onAddCompetition}
              onToggleFavouriteSport={api.toggleFavouriteSport}
              isFavourite={api.isSelected(group.id)}
              onRemoveFavouriteCompetition={api.toggleFavouriteCompetition}
            />
          ))}

          <Heading>
            <DictionaryTerm termKey="favourite-sports-selector.heading.all" />
          </Heading>
          <DictionaryTerm termKey="favourite-sports-selector.selectall">
            {allSportsGroupTitle => {
              const allSportsGroup: FavouriteSportsSelectorListItem_Group = {
                id: -1,
                icon:
                  "https://cms.casumo.com/wp-content/uploads/2019/02/all_sports.svg",
                name: allSportsGroupTitle,
                sport: "all",
                canSelectSubgroups: false,
                favouriteCompetitions: [],
              };
              return (
                <ListItem
                  data-test="favourite-sports-selector-all"
                  group={allSportsGroup}
                  isFavouritable={false}
                  showCompetitionIntro={false}
                  onAddCompetition={props.onAddCompetition}
                  onToggleFavouriteSport={api.toggleAllSports}
                  isFavourite={false}
                  onRemoveFavouriteCompetition={api.toggleFavouriteCompetition}
                />
              );
            }}
          </DictionaryTerm>

          {otherGroups.map(group => (
            <ListItem
              data-test="favourite-sports-selector-other"
              key={group.id}
              group={group}
              showCompetitionIntro={props.showCompetitionIntro}
              onAddCompetition={props.onAddCompetition}
              onToggleFavouriteSport={api.toggleFavouriteSport}
              isFavourite={api.isSelected(group.id)}
              onRemoveFavouriteCompetition={api.toggleFavouriteCompetition}
            />
          ))}
        </>
      );
    }}
  </StageFavouritesConsumer>
);

FavouriteSportsSelector.fragments = {
  group: gql`
    fragment FavouriteSportsSelector_Group on EventGroup {
      id
      name
      popular
      ...FavouriteSportsSelectorListItem_Group
    }

    ${ListItem.fragments.group}
  `,
};

export default FavouriteSportsSelector;
