/* @flow */
import * as React from "react";
import List from "@casumo/cmp-list";
import gql from "graphql-tag";
import * as A from "Types/apollo";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import StageFavouritesConsumer from "../StageFavouritesContext/StageFavouritesConsumer";
import { FavouriteSportsSelectorIntro } from "./FavouriteSportsSelectorIntro";
import Heading from "./FavouriteSportsSelectorHeading";
import ListItem from "./FavouriteSportsSelectorListItem";
import ListItemSkeleton from "./FavouriteSportsSelectorListItemSkeleton";

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
          <FavouriteSportsSelectorIntro
            isSportsPlayer={api.isSportsPlayer}
            hasFavourites={!api.isFirstTimeSelectingFavourites}
          />

          <Heading>
            <DictionaryTerm termKey="favourite-sports-selector.heading.popular" />
          </Heading>

          {popularGroups.length > 0 ? (
            <List
              itemSpacing="md"
              items={popularGroups}
              render={group => (
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
              )}
            />
          ) : (
            <List
              itemSpacing="md"
              items={[...Array(5)]}
              render={(_, i) => <ListItemSkeleton key={i} />}
            />
          )}

          <Heading>
            <DictionaryTerm termKey="favourite-sports-selector.heading.all" />
          </Heading>
          <DictionaryTerm termKey="favourite-sports-selector.selectall">
            {allSportsGroupTitle => {
              const allSportsGroup: A.FavouriteSportsSelectorListItem_Group = {
                id: -1,
                icon:
                  "https://cms.casumo.com/wp-content/uploads/2019/02/all_sports.svg",
                name: allSportsGroupTitle,
                sport: "all",
                canSelectSubgroups: false,
                favouriteCompetitions: [],
                activeIndicator: null,
              };
              return otherGroups.length > 0 ? (
                <List
                  itemSpacing="md"
                  items={[allSportsGroup, ...otherGroups]}
                  render={group => {
                    const isAllToggle = group.id === -1;
                    const toggleAction = isAllToggle
                      ? api.toggleAllSports
                      : api.toggleFavouriteSport;
                    const testIdentifier = isAllToggle
                      ? "favourite-sports-selector-all"
                      : "favourite-sports-selector-other";

                    return (
                      <ListItem
                        data-test={testIdentifier}
                        key={group.id}
                        group={group}
                        isFavouritable={!isAllToggle}
                        showCompetitionIntro={props.showCompetitionIntro}
                        onAddCompetition={props.onAddCompetition}
                        onToggleFavouriteSport={toggleAction}
                        isFavourite={api.isSelected(group.id)}
                        onRemoveFavouriteCompetition={
                          api.toggleFavouriteCompetition
                        }
                      />
                    );
                  }}
                />
              ) : (
                <List
                  itemSpacing="md"
                  items={[...Array(5)]}
                  render={(_, i) => <ListItemSkeleton key={i} />}
                />
              );
            }}
          </DictionaryTerm>
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
