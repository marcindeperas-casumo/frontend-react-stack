// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";
import Media from "@casumo/cmp-media";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { CmsImage } from "Features/sports/components/CmsImage";

const SportsPlayerIntro = () => (
  <Media
    className="u-padding-top--lg"
    spacing="sm"
    renderImage={() => (
      <CmsImage
        id="favourite-sports-selector.intro.sports"
        className="u-padding-right--md"
      />
    )}
    renderText={() => (
      <Text size="sm">
        <DictionaryTerm termKey="favourite-sports-selector.intro.sports" />
      </Text>
    )}
  />
);

const CasinoPlayerIntro = () => (
  <Text className="u-padding-top--lg" size="sm">
    <DictionaryTerm termKey="favourite-sports-selector.intro" />
  </Text>
);

type Props = {
  isSportsPlayer: boolean,
  hasFavourites: boolean,
};

export const FavouriteSportsSelectorIntro = ({
  isSportsPlayer = false,
  hasFavourites = false,
}: Props) => {
  if (hasFavourites) {
    return null;
  }

  if (isSportsPlayer) {
    return <SportsPlayerIntro />;
  }

  return <CasinoPlayerIntro />;
};
