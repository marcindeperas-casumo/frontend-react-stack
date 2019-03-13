// @flow
import React from "react";
import { Mutation } from "react-apollo";
import SimpleQuery from "Features/sports/state/components/SimpleQuery";
import type { MutationProps, QueryProps } from "../types";
import * as queries from "./queries";
import * as mutations from "./mutations";

export const ActiveModalsQuery = (props: QueryProps<ActiveModals, null>) => {
  return (
    <SimpleQuery {...props} query={queries.ACTIVE_MODALS_QUERY}>
      {data => props.children(data)}
    </SimpleQuery>
  );
};

export const BetslipVisibleQuery = (props: QueryProps<null, null>) => (
  <SimpleQuery {...props} query={queries.BETSLIP_VISIBLE_QUERY}>
    {data => props.children(data)}
  </SimpleQuery>
);

export const NavigateClientMutation = (
  props: MutationProps<NavigateClient, NavigateClientVariables>
) => (
  <Mutation {...props} mutation={mutations.NAVIGATE_CLIENT_MUTATION}>
    {props.children}
  </Mutation>
);

export const OpenModalMutation = (
  props: MutationProps<OpenModal, OpenModalVariables>
) => (
  <Mutation {...props} mutation={mutations.OPEN_MODAL_MUTATION}>
    {props.children}
  </Mutation>
);

export const CloseModalMutation = (
  props: MutationProps<CloseModal, CloseModalVariables>
) => (
  <Mutation {...props} mutation={mutations.CLOSE_MODAL_MUTATION}>
    {props.children}
  </Mutation>
);

export const KambiClientVisibleQuery = (props: QueryProps<null, null>) => (
  <SimpleQuery {...props} query={queries.KAMBI_CLIENT_VISIBLE_QUERY}>
    {data => props.children(data)}
  </SimpleQuery>
);
