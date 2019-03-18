/* @flow */
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Flex from "@casumo/cmp-flex";
import { any, partition, propEq } from "ramda";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { isNilOrEmpty } from "Src/utils";
import Heading from "./FavouriteCompetitionsSelectorHeading";
import Region from "./FavouriteCompetitionsSelectorRegion";
import Intro from "./FavouriteCompetitionsSelectorIntro";

type Competition = FavouriteCompetitionsSelectorQuery_group_groups_groups;
type Props = {
  /** Id of Group to select competitions for */
  groupId: number,
  /** Is the competition with this id selected? */
  isCompetitionSelected: (
    competitionId: $ElementType<Competition, "id">
  ) => boolean,
  /** What should happen when this competition is toggled between selected/unselected */
  toggleCompetition: (competition: Competition) => void,
};

export const FAVOURITE_COMPETITIONS_SELECTOR_QUERY = gql`
  query FavouriteCompetitionsSelectorQuery($groupId: Int!) {
    group(groupId: $groupId) {
      name
      ...FavouriteCompetitionsSelectorIntro_Group

      groups {
        id
        popular
        ...FavouriteCompetitionsSelectorRegion_Group

        groups {
          id
          popular
        }
      }
    }
  }
  ${Intro.fragments.group}
  ${Region.fragments.group}
`;

class FavouriteCompetitionsSelectorTypedQuery extends Query<
  FavouriteCompetitionsSelectorQuery,
  FavouriteCompetitionsSelectorQueryVariables
> {}

export const isOrphanGroup = (
  group: FavouriteCompetitionsSelectorQuery_group
) => isNilOrEmpty(group.groups);

export const isPopularGroup = (
  group: FavouriteCompetitionsSelectorQuery_group
) => any(propEq("popular", true), group.groups);

// TODO:(adampilks) - change graphql server to have concept of Sports/Regions/Competitions?
export const transformOrphanGroup = (
  group: FavouriteCompetitionsSelectorQuery_group
) => ({
  popular: false,
  groups: undefined,
  flagEmoji: "",
  userFavourite: true,
  ...group,
});

const FavouriteCompetitionsSelector = (props: Props) => (
  <FavouriteCompetitionsSelectorTypedQuery
    query={FAVOURITE_COMPETITIONS_SELECTOR_QUERY}
    variables={{
      groupId: props.groupId,
    }}
  >
    {({ data }) => {
      if (!data || !data.group) {
        // TODO: add skeleton
        return <Flex.Block>{""}</Flex.Block>;
      }

      const groups: Array<FavouriteCompetitionsSelectorQuery_group_groups> =
        data.group.groups || [];

      const [orphanGroups, nonOrphanGroups] = partition(isOrphanGroup, groups);

      const regionGroups = [
        ...nonOrphanGroups,
        // Create region that contains all orphaned (non-regional competitions)
        {
          name: "International",
          userFavourite: false,
          popular: false,
          groups: orphanGroups.map(transformOrphanGroup),
          id: -1,
          flagEmoji: "",
        },
      ];

      const [popularRegionGroups, otherRegionGroups] = partition(
        isPopularGroup,
        regionGroups
      );

      return (
        <>
          {data.group && <Intro group={data.group} />}

          <Heading>
            <DictionaryTerm termKey="favourite-competitions-selector.heading.popular" />
          </Heading>
          {popularRegionGroups.map((group, index) => (
            <Region
              key={group.id}
              group={group}
              isExpanded={index === 0}
              isSelected={props.isCompetitionSelected}
              // $FlowFixMe - @adampilks when refactoring query to use Sports/Compeition types, remove this.
              onClick={props.toggleCompetition}
            />
          ))}

          <Heading>
            <DictionaryTerm termKey="favourite-competitions-selector.heading.all" />
          </Heading>
          {otherRegionGroups.map((group, index) => (
            <Region
              key={group.id}
              group={group}
              isExpanded={false}
              isSelected={props.isCompetitionSelected}
              // $FlowFixMe - @adampilks when refactoring query to use Sports/Compeition types, remove this.
              onClick={props.toggleCompetition}
            />
          ))}
        </>
      );
    }}
  </FavouriteCompetitionsSelectorTypedQuery>
);

export default FavouriteCompetitionsSelector;
