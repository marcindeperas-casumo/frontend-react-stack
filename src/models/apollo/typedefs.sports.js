import { gql } from "@apollo/client";

export const TypeDefsSports = gql`
  enum Modal {
    SEARCH
    BETTING_GLOSSARY
    CHOOSE_FAVOURITES
    CHOOSE_FAVOURITE_COMPETITIONS
  }
`;
