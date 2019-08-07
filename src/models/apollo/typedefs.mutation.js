import gql from "graphql-tag";

export const TypeDefsMutation = gql`
  extend type Mutation {
    navigateClient(path: String!, trackingLocation: String!): Boolean
    updateBetslipState(isVisible: Boolean!): Boolean
    updateKambiClientState(isVisible: Boolean!): Boolean
    closeBetslip: Boolean
    openBetslip: Boolean
    minimizeBetslip: Boolean
    openModal(modal: Modal): Boolean
    closeModal(modal: Modal): Boolean
    closeAllModals: Boolean
    showSearch: Boolean
    hideSearch: Boolean
  }
`;
