// @flow
import * as React from "react";
import gql from "graphql-tag";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import ExpandableListItem from "Features/sports/components/ExpandableListItem";
import CompetitionPillsList from "Features/sports/components/CompetitionPillsList";
import { isNilOrEmpty } from "Src/utils";
import FavouriteCompetitionsCount from "./FavouriteCompetitionsCount";

type Competition = gFavouriteCompetitionsSelectorRegion_Group_groups;

type Props = {
  /** The region Group to render the selector for, type defined by FavouriteCompetitionsSelectorRegion.fragments.group */
  group: gFavouriteCompetitionsSelectorRegion_Group,
  /** Whether this region's competitions should be initially expanded */
  isExpanded: boolean,
  /** Is the competition with this Id selected? */
  isSelected: (groupId: $ElementType<Competition, "id">) => boolean,
  /** What to do when a competition is clicked, given the competition data */
  onClick: (group: Competition) => void,
};

const FavouriteCompetitionsSelectorRegion = ({
  group,
  isExpanded,
  isSelected,
  onClick,
}: Props): React.Node =>
  !group.groups || isNilOrEmpty(group.groups) ? null : (
    <div className="u-margin-y">
      <ExpandableListItem
        isExpanded={isExpanded}
        label={
          <Flex align="center">
            <Flex.Item>
              <Text
                size="md"
                className="u-font-weight-bold u-margin-bottom--none"
              >
                {group.name}
              </Text>
            </Flex.Item>
            <FavouriteCompetitionsCount
              count={group.groups.filter(c => isSelected(c.id)).length}
            />
          </Flex>
        }
      >
        <CompetitionPillsList
          competitions={group.groups}
          isActive={c => isSelected(c.id)}
          onClick={onClick}
        />
      </ExpandableListItem>
    </div>
  );

FavouriteCompetitionsSelectorRegion.fragments = {
  group: gql`
    fragment FavouriteCompetitionsSelectorRegion_Group on EventGroup {
      name
      regionCode
      groups {
        id
        ...CompetitionPillsList_Group
      }
    }
    ${CompetitionPillsList.fragments.group}
  `,
};

export default FavouriteCompetitionsSelectorRegion;
