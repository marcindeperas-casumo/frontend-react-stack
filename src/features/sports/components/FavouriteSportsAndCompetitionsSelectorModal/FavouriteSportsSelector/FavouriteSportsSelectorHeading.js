// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";

const FavouriteSportsSelectorHeading = ({
  children,
}: {
  children: React.Node,
}) => (
  <Text tag="h2" className="u-margin-horiz--md u-margin-vert--lg">
    {children}
  </Text>
);

export default FavouriteSportsSelectorHeading;
