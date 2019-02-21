// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";

const FavouriteSportsSelectorIntro = ({
  children,
}: {
  children: React.Node,
}) => (
  <Text className="u-padding-horiz--md u-padding-vert--lg" size="sm">
    {children}
  </Text>
);

export default FavouriteSportsSelectorIntro;
