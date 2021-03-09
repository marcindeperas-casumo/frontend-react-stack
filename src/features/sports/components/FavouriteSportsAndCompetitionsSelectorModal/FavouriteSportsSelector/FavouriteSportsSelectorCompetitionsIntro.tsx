import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { ButtonPrimary } from "@casumo/cmp-button";
import * as React from "react";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";

const FavouriteSportsSelectorCompetitionsIntro = ({
  onAdd,
}: {
  onAdd: () => void;
}): React.ReactNode => (
  <Flex
    direction="horizontal"
    gap="sm"
    justify="space-between"
    className="u-margin-bottom--md"
  >
    <Flex.Block>
      <Text size="sm" className="u-margin--none">
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey="favourite-sports-selector.suggestion" />
      </Text>
    </Flex.Block>

    <Flex.Item>
      <ButtonPrimary size="xs" onClick={onAdd}>
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey="favourite-sports-selector.suggestion.button" />
      </ButtonPrimary>
    </Flex.Item>
  </Flex>
);

export default FavouriteSportsSelectorCompetitionsIntro;
