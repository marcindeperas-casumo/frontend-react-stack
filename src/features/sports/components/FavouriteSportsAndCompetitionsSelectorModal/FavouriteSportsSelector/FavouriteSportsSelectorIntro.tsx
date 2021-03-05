import Text from "@casumo/cmp-text";
import Media from "@casumo/cmp-media";
import * as React from "react";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { CmsImage } from "Features/sports/components/CmsImage";

const SportsPlayerIntro = () => (
  <Media
    className="u-padding-top--lg"
    spacing="sm"
    renderImage={() => (
      // @ts-expect-error ts-migrate(2786) FIXME: 'CmsImage' cannot be used as a JSX component.
      <CmsImage
        id="favourite-sports-selector.intro.sports"
        className="u-padding-right--md"
      />
    )}
    renderText={() => (
      <Text size="sm">
        {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
        <DictionaryTerm termKey="favourite-sports-selector.intro.sports" />
      </Text>
    )}
  />
);

const CasinoPlayerIntro = () => (
  <Text className="u-padding-top--lg" size="sm">
    {/* @ts-expect-error ts-migrate(2786) FIXME: 'DictionaryTerm' cannot be used as a JSX component... Remove this comment to see the full error message */}
    <DictionaryTerm termKey="favourite-sports-selector.intro" />
  </Text>
);

type Props = {
  isSportsPlayer: boolean;
  hasFavourites: boolean;
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
