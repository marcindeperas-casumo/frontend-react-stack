import { gql } from "@apollo/client";
import Text from "@casumo/cmp-text";
import * as React from "react";
import * as A from "Types/apollo";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";

const FavouriteCompetitionsSelectorIntro = ({
  /** The group object to render the into for, type of group is defined by FavouriteCompetitionsSelectorIntro.fragments.group  */
  group,
}: {
  group: A.FavouriteCompetitionsSelectorIntro_GroupFragment;
}) => (
  <Text size="sm" className="u-margin-y--xlg">
    {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
    <DictionaryTerm
      termKey="favourite-competitions-selector.intro"
      replacements={{
        sportName: group.name.toLowerCase(),
      }}
    />
  </Text>
);

FavouriteCompetitionsSelectorIntro.fragments = {
  group: gql`
    fragment FavouriteCompetitionsSelectorIntro_Group on EventGroup {
      name
    }
  `,
};

export default FavouriteCompetitionsSelectorIntro;
