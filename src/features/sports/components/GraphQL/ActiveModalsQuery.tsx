import React from "react";
import * as A from "Types/apollo";
import { ACTIVE_MODALS_QUERY } from "Models/apollo/queries";
import type { QueryProps } from "Models/apollo/types";
import { SimpleQuery } from "./SimpleQuery";

export const ActiveModalsQuery = (
  props: QueryProps<A.ActiveModalsQuery, A.ActiveModalsQueryVariables>
) => {
  return (
    <SimpleQuery {...props} query={ACTIVE_MODALS_QUERY}>
      {/* @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{}' is not assignable to paramet... Remove this comment to see the full error message */}
      {data => props.children(data)}
    </SimpleQuery>
  );
};
