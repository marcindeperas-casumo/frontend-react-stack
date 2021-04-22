import Text from "@casumo/cmp-text";
import * as React from "react";

const FavouriteSportsSelectorHeading = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Text
    tag="h2"
    className="u-margin-top--3xlg u-margin-bottom--md text-grey-50"
  >
    {children}
  </Text>
);

export default FavouriteSportsSelectorHeading;
