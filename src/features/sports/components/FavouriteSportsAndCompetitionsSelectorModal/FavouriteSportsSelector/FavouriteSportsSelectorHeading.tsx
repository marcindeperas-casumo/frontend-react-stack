// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";

const FavouriteSportsSelectorHeading = ({
  children,
}: {
  children: React.Node,
}) => (
  <Text
    tag="h2"
    className="u-margin-top--3xlg u-margin-bottom--md t-color-grey-50"
  >
    {children}
  </Text>
);

export default FavouriteSportsSelectorHeading;
