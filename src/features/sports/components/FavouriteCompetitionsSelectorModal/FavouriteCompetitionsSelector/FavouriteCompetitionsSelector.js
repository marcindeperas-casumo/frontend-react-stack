/* @flow */
import * as React from "react";
import List from "@casumo/cmp-list";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { any, partition, propEq } from "ramda";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { isNilOrEmpty } from "Src/utils";
import Heading from "./FavouriteCompetitionsSelectorHeading";
import Region from "./FavouriteCompetitionsSelectorRegion";
import Intro from "./FavouriteCompetitionsSelectorIntro";
import Skeleton from "./FavouriteCompetitionsSelectorSkeleton";

type Competition = A.FavouriteCompetitionsSelectorQuery_group_groups_groups;
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

    internationalGroupName: dictionaryTerm(
      key: "favourite-competitions-selector.group.international"
    )
  }
  ${Intro.fragments.group}
  ${Region.fragments.group}
`;

export const isOrphanGroup = (
  group: A.FavouriteCompetitionsSelectorQuery_group
) => isNilOrEmpty(group.groups);

export const isPopularGroup = (
  group: A.FavouriteCompetitionsSelectorQuery_group
) => any(propEq("popular", true), group.groups);

// TODO:(adampilks) - change graphql server to have concept of Sports/Regions/Competitions?
export const transformOrphanGroup = (
  group: A.FavouriteCompetitionsSelectorQuery_group
) => ({
  popular: false,
  groups: undefined,
  regionCode: "",
  userFavourite: true,
  ...group,
});

export const FavouriteCompetitionsSelector = (props: Props) => {
  const { data } = useQuery(FAVOURITE_COMPETITIONS_SELECTOR_QUERY, {
    variables: { groupId: props.groupId },
  });

  if (!data || !data.group) {
    return <Skeleton />;
  }

  const groups: Array<A.FavouriteCompetitionsSelectorQuery_group_groups> =
    data.group.groups || [];

  const [orphanGroups, nonOrphanGroups] = partition(isOrphanGroup, groups);

  const regionGroups = [
    ...nonOrphanGroups,
    // Create region that contains all orphaned (non-regional competitions)
    {
      name: data.internationalGroupName,
      userFavourite: false,
      popular: false,
      groups: orphanGroups.map(transformOrphanGroup),
      id: -1,
      regionCode: "",
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
      <List
        items={popularRegionGroups}
        render={group => (
          <Region
            key={group.id}
            group={group}
            isExpanded={group === popularRegionGroups[0]}
            isSelected={props.isCompetitionSelected}
            // $FlowFixMe - @adampilks when refactoring query to use Sports/Compeition types, remove this.
            onClick={props.toggleCompetition}
          />
        )}
      />

      <Heading>
        <DictionaryTerm termKey="favourite-competitions-selector.heading.all" />
      </Heading>
      <List
        items={otherRegionGroups}
        render={group => (
          <Region
            key={group.id}
            group={group}
            isExpanded={false}
            isSelected={props.isCompetitionSelected}
            // $FlowFixMe - @adampilks when refactoring query to use Sports/Compeition types, remove this.
            onClick={props.toggleCompetition}
          />
        )}
      />
    </>
  );
};
