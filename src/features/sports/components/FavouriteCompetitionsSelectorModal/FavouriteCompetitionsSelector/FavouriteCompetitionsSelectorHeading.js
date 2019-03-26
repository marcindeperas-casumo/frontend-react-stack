// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";

const FavouriteCompetitionsSelectorHeading = ({
  children,
}: {
  children: React.Node,
}) => (
  <Text className="t-color-grey-dark-1 u-font-weight-bold u-margin-top--2xlg u-margin-bottom--xlg">
    {children}
  </Text>
);

export default FavouriteCompetitionsSelectorHeading;
