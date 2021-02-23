// @flow
import * as React from "react";
import Text from "@casumo/cmp-text";

const FavouriteCompetitionsSelectorHeading = ({
  children,
}: {
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Node'.
  children: React.Node,
}) => (
  <Text className="t-color-grey-50 u-font-weight-bold u-margin-top--3xlg u-margin-bottom--xlg">
    {children}
  </Text>
);

export default FavouriteCompetitionsSelectorHeading;
