// @flow
import React from "react";
import * as A from "Types/apollo";
import { ACTIVE_MODALS_QUERY } from "Models/apollo/queries";
import type { QueryProps } from "Models/apollo/types";
import { SimpleQuery } from "./SimpleQuery";

export const ActiveModalsQuery = (props: QueryProps<A.ActiveModals, null>) => {
  return (
    <SimpleQuery {...props} query={ACTIVE_MODALS_QUERY}>
      {data => props.children(data)}
    </SimpleQuery>
  );
};
