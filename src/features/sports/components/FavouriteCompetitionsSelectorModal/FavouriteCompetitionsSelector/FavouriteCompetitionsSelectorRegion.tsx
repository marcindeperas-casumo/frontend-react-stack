import { gql } from "@apollo/client";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import * as React from "react";
import * as A from "Types/apollo";
import ExpandableListItem from "Features/sports/components/ExpandableListItem";
import CompetitionPillsList from "Features/sports/components/CompetitionPillsList";
import { isNilOrEmpty } from "Src/utils";
import FavouriteCompetitionsCount from "./FavouriteCompetitionsCount";

type Competition =
  A.FavouriteCompetitionsSelectorRegion_GroupFragment["groups"];

type Props = {
  /** The region Group to render the selector for, type defined by FavouriteCompetitionsSelectorRegion.fragments.group */
  group: A.FavouriteCompetitionsSelectorRegion_GroupFragment;
  /** Whether this region's competitions should be initially expanded */
  isExpanded: boolean;
  /** Is the competition with this Id selected? */
  isSelected: (groupId: number) => boolean;
  /** What to do when a competition is clicked, given the competition data */
  onClick: (group: Competition) => void;
  /** Id of Group to select competitions for */
  sportId: number;
  /** Name of Group to select competitions for */
  sportName: string;
  /** Is favourites sports eq 0 */
  isOnboarding: boolean;
  /** group ID **/
  groupId: number;
};

const FavouriteCompetitionsSelectorRegion = ({
  group,
  isExpanded,
  isSelected,
  onClick,
  sportName,
  sportId,
  isOnboarding,
  groupId,
}: Props): React.ReactNode =>
  !group.groups || isNilOrEmpty(group.groups) ? null : (
    <div className="u-margin-y">
      <ExpandableListItem
        isExpanded={isExpanded}
        data={{
          sportName,
          sportId,
          isOnboarding,
          groupName: group.name,
          groupId: groupId,
        }}
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
            {/* @ts-expect-error ts-migrate(2786) FIXME: 'FavouriteCompetitionsCount' cannot be used as a J... Remove this comment to see the full error message */}
            <FavouriteCompetitionsCount
              count={group.groups.filter(c => isSelected(c.id)).length}
            />
          </Flex>
        }
      >
        <CompetitionPillsList
          competitions={group.groups}
          isActive={c => isSelected(c.id)}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '(group: ({ id: number; } & { id: number; use... Remove this comment to see the full error message
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
