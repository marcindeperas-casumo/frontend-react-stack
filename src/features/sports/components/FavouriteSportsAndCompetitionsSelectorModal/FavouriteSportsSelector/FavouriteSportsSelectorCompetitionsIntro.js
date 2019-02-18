// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import Button from "@casumo/cmp-button";

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
    <Text size="sm">
      <DictionaryTerm termKey="favourite-sports-selector.suggestion" />
    </Text>

    <Button size="sm" variant="outline-positive" onClick={onAdd}>
      <DictionaryTerm termKey="favourite-sports-selector.suggestion.button" />
    </Button>
  </Flex>
);

export default FavouriteSportsSelectorCompetitionsIntro;
