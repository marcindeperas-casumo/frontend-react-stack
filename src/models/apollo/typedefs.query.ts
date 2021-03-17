import { gql } from "@apollo/client";

export const TypeDefsQuery = gql`
  extend type Query {
    activeModals: [Modal!]!
    isBetslipVisible: Boolean!
    kambiClientVisible: Boolean!
    isSearchVisible: Boolean!
  }
`;
