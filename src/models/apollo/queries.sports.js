// @flow
import { gql } from "@apollo/client";

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

export const SPORTS_SHELL_QUERY = gql`
  query SportsShellQuery {
    hasSelectedFavourites
    isSearchVisible @client
  }
`;

export const LAUNCHABLE_KAMBI_CLIENT_QUERY = gql`
  query LaunchableKambiClientQuery {
    userHomepage
    kambiClientVisible @client
    isBetslipVisible @client
  }
`;
