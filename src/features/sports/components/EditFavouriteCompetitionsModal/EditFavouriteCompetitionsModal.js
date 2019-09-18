/* @flow */
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
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

class EditFavouriteCompetitionsTypedQuery extends Query<
  EditFavouriteCompetitions,
  EditFavouriteCompetitionsVariables
> {}

const EditFavouriteCompetitionsModal = ({
  onClose,
  groupId = 1000093190,
}: Props) => (
  <EditFavouriteCompetitionsTypedQuery
    query={EDIT_FAVOURITE_COMPETITIONS_QUERY}
    variables={{ groupId }}
    fetchPolicy="network-only"
  >
    {({ data, loading }) => {
      if (loading || !data || !data.favouriteCompetitions) {
        return null;
      }

      return (
        <SetFavouriteCompetitions>
          {setFavouriteCompetitions => (
            <FavouriteCompetitionsSelectorModal
              onClose={onClose}
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
    }}
  </EditFavouriteCompetitionsTypedQuery>
);

export default EditFavouriteCompetitionsModal;
