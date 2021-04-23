import Text from "@casumo/cmp-text";
import * as React from "react";

const FavouriteCompetitionsSelectorHeading = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Text className="text-grey-50 u-font-weight-bold u-margin-top--3xlg u-margin-bottom--xlg">
    {children}
  </Text>
);

export default FavouriteCompetitionsSelectorHeading;
