// @flow
import * as React from "react";
import gql from "graphql-tag";
import Text from "@casumo/cmp-text";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";

const FavouriteCompetitionsSelectorIntro = ({
  /** The group object to render the into for, type of group is defined by FavouriteCompetitionsSelectorIntro.fragments.group  */
  group,
}: {
  group: A.FavouriteCompetitionsSelectorIntro_Group,
}) => (
  <Text size="sm" className="u-margin-y--xlg">
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
