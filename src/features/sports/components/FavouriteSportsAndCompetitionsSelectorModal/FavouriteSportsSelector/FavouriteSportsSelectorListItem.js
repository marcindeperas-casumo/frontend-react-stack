// @flow
import React from "react";
import gql from "graphql-tag";
import { T } from "ramda";
import FavouriteListItem from "Features/sports/components/FavouriteListItem";
import CompetitionPillsList from "Features/sports/components/CompetitionPillsList";
import CompetitionsIntro from "./FavouriteSportsSelectorCompetitionsIntro";

type Props = {
  /** Sport group to render the favourite selector for, type comes from FavouriteSportsSelectorListItem.fragments.group */
  group: FavouriteSportsSelectorListItem_Group,
  /** Whether this group should be favouritable */
  isFavouritable?: boolean,
  /** Whether we should show an intro to selecting competitions */
  showCompetitionIntro: boolean,
  /** What should happen with the sport data when the group is toggled */
  onToggleFavouriteSport: (id: number) => void,
  /** What should happen when the buttons to edit competitions for this group are clicked */
  onAddCompetition: (groupId: number) => void,
  /** Whether this list item should be in its favourited state */
  isFavourite: boolean,
  /** What should happen when a competition is removed  */
  onRemoveFavouriteCompetition: (
    groupId: number,
    competition: FavouriteSportsSelectorListItem_Group_favouriteCompetitions
  ) => void,
};

const FavouriteSportsSelectorListItem = ({
  group,
  isFavouritable,
  showCompetitionIntro,
  onToggleFavouriteSport,
  onAddCompetition,
  isFavourite,
  onRemoveFavouriteCompetition,
}: Props) => (
  <>
    <FavouriteListItem
      label={group.name}
      icon={<img src={group.icon} alt={group.name} />}
      onClick={() => onToggleFavouriteSport(group.id)}
      isFavourite={isFavourite}
      isFavouritable={isFavouritable}
    />
    {group.canSelectSubgroups && isFavourite && (
      <div className="u-margin-horiz--md u-margin-bottom--lg">
        {showCompetitionIntro && (
          <CompetitionsIntro onAdd={() => onAddCompetition(group.id)} />
        )}
        <CompetitionPillsList
          competitions={group.favouriteCompetitions}
          onRemove={c => onRemoveFavouriteCompetition(group.id, c)}
          isActive={T}
          onAdd={
            showCompetitionIntro ? undefined : () => onAddCompetition(group.id)
          }
        />
      </div>
    )}
  </>
);

FavouriteSportsSelectorListItem.fragments = {
  group: gql`
    fragment FavouriteSportsSelectorListItem_Group on EventGroup {
      id
      name
      icon
      canSelectSubgroups

      favouriteCompetitions {
        ...CompetitionPillsList_Group
      }
    }
    ${CompetitionPillsList.fragments.group}
  `,
};

export default FavouriteSportsSelectorListItem;
