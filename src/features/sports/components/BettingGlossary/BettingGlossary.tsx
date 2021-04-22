import List from "@casumo/cmp-list";
import { gql, useQuery } from "@apollo/client";
import * as React from "react";
import * as A from "Types/apollo";
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
  onClose: (e: any) => void;
};

export const BettingGlossary = ({ onClose }: Props) => (
  <SportsModal>
    <SportsModal.Header
      onClose={onClose}
      className="c-sports-modal-header--left-align bg-white text-grey-90 t-border-bottom border-grey-20"
    >
      <DictionaryTerm termKey="glossary.heading" />
    </SportsModal.Header>
    <BettingGlossaryModalContent />
  </SportsModal>
);

export const BettingGlossaryModalContent = () => {
  const { data, error, loading } = useQuery<
    A.GlossaryQuery,
    A.GlossaryQueryVariables
  >(GLOSSARY_QUERY);

  if (error) {
    return (
      <ErrorMessage
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type 'string'.
        errorMessage={<DictionaryTerm termKey="glossary.error" />}
      />
    );
  }

  if (!data || !data.glossary || loading) {
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
