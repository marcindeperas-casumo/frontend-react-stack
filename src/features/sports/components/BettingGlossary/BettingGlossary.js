// @flow
import * as React from "react";
import List from "@casumo/cmp-list";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { SportsModal } from "Features/sports/components/SportsModal";
import { DictionaryTerm } from "Features/sports/components/DictionaryTerm";
import { ErrorMessage } from "Components/ErrorMessage";
import { BettingGlossarySkeleton } from "Features/sports/components/BettingGlossary";
import { BettingGlossaryEntry } from "./BettingGlossaryEntry";

export const GLOSSARY_QUERY = gql`
  query GlossaryQuery {
    glossary {
      id
      term
      aka
      definition
    }
  }
`;

type Props = {
  onClose: any => void,
};

export const BettingGlossary = ({ onClose }: Props) => (
  <SportsModal>
    <SportsModal.Header
      onClose={onClose}
      className="c-sports-modal-header--left-align t-background-white t-color-chrome-dark-3 t-border-bottom"
    >
      <DictionaryTerm termKey="glossary.heading" />
    </SportsModal.Header>
    <BettingGlossaryModalContent />
  </SportsModal>
);

export const BettingGlossaryModalContent = () => {
  const { data, error, loading } = useQuery(GLOSSARY_QUERY);

  if (error) {
    return (
      <ErrorMessage
        errorMessage={<DictionaryTerm termKey="glossary.error" />}
      />
    );
  }

  if (!data?.glossary || loading) {
    return (
      <SportsModal.Content>
        <BettingGlossarySkeleton />
      </SportsModal.Content>
    );
  }

  return (
    <SportsModal.Content>
      <List
        items={data.glossary}
        itemSpacing="md"
        render={props => <BettingGlossaryEntry {...props} />}
      />
    </SportsModal.Content>
  );
};
