// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";

const FavouriteSportsSelectorCompetitionsIntro = ({
  onAdd,
}: {
  onAdd: () => void,
}): React.Node => (
  <Flex
    direction="horizontal"
    gap="sm"
    justify="space-between"
    className="u-margin-bottom--md"
  >
    <Flex.Block>
      <Text size="sm" className="u-margin--none">
        <DictionaryTerm termKey="favourite-sports-selector.suggestion" />
      </Text>
    </Flex.Block>

    <Flex.Item>
      <ButtonPrimary size="xs" onClick={onAdd}>
        <DictionaryTerm termKey="favourite-sports-selector.suggestion.button" />
      </ButtonPrimary>
    </Flex.Item>
  </Flex>
);

export default FavouriteSportsSelectorCompetitionsIntro;
