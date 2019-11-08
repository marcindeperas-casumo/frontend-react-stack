// @flow
import gql from "graphql-tag";

export const ACTIVE_MODALS_QUERY = gql`
  query ActiveModals {
    activeModals @client
  }
`;

export const BETSLIP_VISIBLE_QUERY = gql`
  query BetslipVisible {
    isBetslipVisible @client
  }
`;

export const KAMBI_CLIENT_VISIBLE_QUERY = gql`
  query KambiClientVisible {
    kambiClientVisible @client
  }
`;

export const SEARCH_VISIBLE_QUERY = gql`
  query SearchVisible {
    isSearchVisible @client
  }
`;
