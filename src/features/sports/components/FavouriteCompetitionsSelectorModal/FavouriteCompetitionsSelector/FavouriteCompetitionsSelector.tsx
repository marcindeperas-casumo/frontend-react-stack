import List from "@casumo/cmp-list";
import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import { any, partition, propEq } from "ramda";
import * as A from "Types/apollo";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { isNilOrEmpty } from "Src/utils";
import Heading from "./FavouriteCompetitionsSelectorHeading";
import Region from "./FavouriteCompetitionsSelectorRegion";
import Intro from "./FavouriteCompetitionsSelectorIntro";
import Skeleton from "./FavouriteCompetitionsSelectorSkeleton";

type Competition = A.FavouriteCompetitionsSelectorQuery["group"]["groups"][number]["groups"];
type Props = {
  /** Id of Group to select competitions for */
  groupId: number;
  /** Name of Group to select competitions for */
  groupName: string;
  /** Is player onboarding on sports*/
  isOnboarding: boolean;
  /** Is the competition with this id selected? */
  isCompetitionSelected: (competitionId: number) => boolean;
  /** What should happen when this competition is toggled between selected/unselected */
  toggleCompetition: (competition: Competition) => void;
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
  group: A.FavouriteCompetitionsSelectorQuery["group"]
) => isNilOrEmpty(group.groups);

export const isPopularGroup = (
  group: A.FavouriteCompetitionsSelectorQuery["group"]
) => any(propEq("popular", true), group.groups);

// TODO:(adampilks) - change graphql server to have concept of Sports/Regions/Competitions?
export const transformOrphanGroup = (
  group: A.FavouriteCompetitionsSelectorQuery["group"]
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

  const groups: A.FavouriteCompetitionsSelectorQuery["group"]["groups"] =
    data.group.groups || [];

  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  const [orphanGroups, nonOrphanGroups] = partition(isOrphanGroup, groups);

  const regionGroups = [
    ...nonOrphanGroups,
    // Create region that contains all orphaned (non-regional competitions)
    {
      name: data.internationalGroupName,
      userFavourite: false,
      popular: false,
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '(group: A.FavouriteCompetitionsS... Remove this comment to see the full error message
      groups: orphanGroups.map(transformOrphanGroup),
      id: -1,
      regionCode: "",
    },
  ];

  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  const [popularRegionGroups, otherRegionGroups] = partition(
    isPopularGroup,
    regionGroups
  );

  return (
    <>
      {data.group && <Intro group={data.group} />}

      <Heading>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey="favourite-competitions-selector.heading.popular" />
      </Heading>
      <List
        items={popularRegionGroups}
        render={group => (
          // @ts-expect-error ts-migrate(2786) FIXME: 'Region' cannot be used as a JSX component.
          <Region
            key={group.id}
            group={group}
            groupId={group.id}
            sportName={props.groupName}
            sportId={props.groupId}
            isOnboarding={props.isOnboarding}
            isExpanded={group === popularRegionGroups[0]}
            isSelected={props.isCompetitionSelected}
            onClick={props.toggleCompetition}
          />
        )}
      />

      <Heading>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey="favourite-competitions-selector.heading.all" />
      </Heading>
      <List
        items={otherRegionGroups}
        render={group => (
          // @ts-expect-error ts-migrate(2786) FIXME: 'Region' cannot be used as a JSX component.
          <Region
            key={group.id}
            sportName={props.groupName}
            sportId={props.groupId}
            isOnboarding={props.isOnboarding}
            group={group}
            groupId={group.id}
            isExpanded={false}
            isSelected={props.isCompetitionSelected}
            onClick={props.toggleCompetition}
          />
        )}
      />
    </>
  );
};
