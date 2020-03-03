// @flow
import React from "react";
import gql from "graphql-tag";
import { T } from "ramda";
import * as A from "Types/apollo";
import FavouriteListItem from "Features/sports/components/FavouriteListItem";
import CompetitionPillsList from "Features/sports/components/CompetitionPillsList";
import SportsIcon from "Features/sports/components/SportsIcon";
import CompetitionsIntro from "./FavouriteSportsSelectorCompetitionsIntro";

type Props = {
  /** Sport group to render the favourite selector for, type comes from FavouriteSportsSelectorListItem.fragments.group */
  group: A.FavouriteSportsSelectorListItem_Group,
  /** Whether this group should be favouritable */
  isFavouritable?: boolean,
  /** Whether we should show an intro to selecting competitions */
  showCompetitionIntro: boolean,
  /** What should happen with the sport data when the group is toggled */
  onToggleFavouriteSport: (id: number) => void,
  /** What should happen when the buttons to edit competitions for this group are clicked */
  onAddCompetition: (
    groupId: number,
    name: string,
    isOnboarding: boolean
  ) => void,
  /** Whether this list item should be in its favourited state */
  isFavourite: boolean,
  /** What should happen when a competition is removed  */
  onRemoveFavouriteCompetition: (
    groupId: number,
    competition: A.FavouriteSportsSelectorListItem_Group_favouriteCompetitions
  ) => void,
  /** Is favorite list eq 0 **/
  isOnboarding: boolean,
};

const FavouriteSportsSelectorListItem = ({
  group,
  isFavouritable,
  showCompetitionIntro,
  onToggleFavouriteSport,
  onAddCompetition,
  isFavourite,
  onRemoveFavouriteCompetition,
  isOnboarding,
}: Props) => (
  <div>
    <FavouriteListItem
      label={group.name}
      icon={
        <SportsIcon
          alt={group.name}
          iconSrc={group.icon}
          activeIndicator={group.activeIndicator}
          isActive={isFavourite}
        />
      }
      onClick={() => onToggleFavouriteSport(group.id)}
      isFavourite={isFavourite}
      isFavouritable={isFavouritable}
    />
    {group.canSelectSubgroups && isFavourite && (
      <>
        {showCompetitionIntro && (
          <div className="u-margin-top--md">
            <CompetitionsIntro
              onAdd={() => onAddCompetition(group.id, group.name, isOnboarding)}
            />
          </div>
        )}
        <div className="u-margin-top--md">
          <CompetitionPillsList
            competitions={group.favouriteCompetitions}
            onRemove={c => onRemoveFavouriteCompetition(group.id, c)}
            isActive={T}
            onAdd={
              showCompetitionIntro
                ? undefined
                : () => onAddCompetition(group.id, group.name, isOnboarding)
            }
          />
        </div>
      </>
    )}
  </div>
);

FavouriteSportsSelectorListItem.fragments = {
  group: gql`
    fragment FavouriteSportsSelectorListItem_Group on EventGroup {
      id
      name
      icon
      activeIndicator
      canSelectSubgroups

      favouriteCompetitions {
        ...CompetitionPillsList_Group
      }
    }
    ${CompetitionPillsList.fragments.group}
  `,
};

export default FavouriteSportsSelectorListItem;
