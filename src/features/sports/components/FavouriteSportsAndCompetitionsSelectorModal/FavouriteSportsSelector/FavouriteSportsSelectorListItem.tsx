import { gql } from "@apollo/client";
import React from "react";
import * as A from "Types/apollo";
import FavouriteListItem from "Features/sports/components/FavouriteListItem";
import CompetitionPillsList from "Features/sports/components/CompetitionPillsList";
import SportsIcon from "Features/sports/components/SportsIcon";

type Props = {
  /** Sport group to render the favourite selector for, type comes from FavouriteSportsSelectorListItem.fragments.group */
  group: A.FavouriteSportsSelectorListItem_GroupFragment;
  /** Whether this group should be favouritable */
  isFavouritable?: boolean;
  /** Whether this group has the `NEW` badge */
  newLabel?: boolean;
  /** Whether we should show an intro to selecting competitions */
  showCompetitionIntro: boolean;
  /** What should happen with the sport data when the group is toggled */
  onToggleFavouriteSport: (id: number) => void;
  /** What should happen when the buttons to edit competitions for this group are clicked */
  onAddCompetition: (
    groupId: number,
    name: string,
    isOnboarding: boolean
  ) => void;
  /** Whether this list item should be in its favourited state */
  isFavourite: boolean;
  /** What should happen when a competition is removed  */
  onRemoveFavouriteCompetition: (
    sportId: number,
    competition: {
      id: number;
      regionCode?: string;
      name: string;
    } & A.FavouriteCompetitionsSelectorModal_GroupFragment & {
        id: number;
        userFavourite: boolean;
      } & A.GroupPill_GroupFragment
  ) => void;
  /** Is favorite list eq 0 **/
  isOnboarding: boolean;
};

const FavouriteSportsSelectorListItem = ({
  group,
  isFavouritable,
  onToggleFavouriteSport,
  isFavourite,
  newLabel,
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
      newLabel={newLabel}
    />
  </div>
);

FavouriteSportsSelectorListItem.fragments = {
  group: gql`
    fragment FavouriteSportsSelectorListItem_Group on EventGroup {
      id
      name
      clientPath
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
