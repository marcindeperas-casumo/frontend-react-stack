/* @flow */
import * as React from "react";
import { gql, useQuery } from "@apollo/client";
import { SetFavouriteCompetitions } from "Features/sports/components/GraphQL";
import FavouriteCompetitionsSelectorModal from "Features/sports/components/FavouriteCompetitionsSelectorModal";

type Props = {
  onClose: any => any,
  groupId: number,
};

const EDIT_FAVOURITE_COMPETITIONS_QUERY = gql`
  query EditFavouriteCompetitions($groupId: Int!) {
    favouriteCompetitions(groupId: $groupId) {
      id
    }
  }
`;

export const EditFavouriteCompetitionsModal = ({
  onClose,
  groupId = 1000093190,
}: Props) => {
  const { data, loading } = useQuery(EDIT_FAVOURITE_COMPETITIONS_QUERY, {
    variables: { groupId },
    fetchPolicy: "network-only",
  });

  if (loading || !data || !data.favouriteCompetitions) {
    return null;
  }

  return (
    <SetFavouriteCompetitions>
      {setFavouriteCompetitions => (
        <FavouriteCompetitionsSelectorModal
          onClose={onClose}
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          onSave={selectedCompetitions => {
            setFavouriteCompetitions({
              variables: {
                groupId,
                ids: selectedCompetitions.map(c => c.id),
              },
            });
            onClose();
          }}
          initiallySelectedCompetitions={data.favouriteCompetitions}
          groupId={groupId}
        />
      )}
    </SetFavouriteCompetitions>
  );
};
