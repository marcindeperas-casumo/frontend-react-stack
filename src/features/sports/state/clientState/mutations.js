/* @flow */

import gql from "graphql-tag";

export const NAVIGATE_CLIENT_MUTATION = gql`
  mutation NavigateClient($path: String!, $trackingLocation: String!) {
    navigateClient(path: $path, trackingLocation: $trackingLocation) @client
  }
`;

export const OPEN_MODAL_MUTATION = gql`
  mutation OpenModal($modal: Modal!) {
    openModal(modal: $modal) @client
  }
`;

export const CLOSE_MODAL_MUTATION = gql`
  mutation CloseModal($modal: Modal!) {
    closeModal(modal: $modal) @client
  }
`;

export const CLOSE_ALL_MODALS_MUTATION = gql`
  mutation CloseAllModals {
    closeAllModals @client
  }
`;

export const UPDATE_KAMBI_CLIENT_STATE_MUTATION = gql`
  mutation UpdateKambiClientState($isVisible: Boolean!) {
    updateKambiClientState(isVisible: $isVisible) @client
  }
`;

export const UPDATE_BETSLIP_STATE_MUTATION = gql`
  mutation UpdateBetslipState($isVisible: Boolean!) {
    updateBetslipState(isVisible: $isVisible) @client
  }
`;

export const SHOW_SEARCH = gql`
  mutation ShowSearch {
    showSearch @client
  }
`;

export const HIDE_SEARCH = gql`
  mutation HideSearch {
    hideSearch @client
  }
`;
