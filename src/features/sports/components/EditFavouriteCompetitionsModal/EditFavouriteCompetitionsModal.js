/* @flow */
import * as React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { SetFavouriteCompetitions } from "Features/sports/state";

import FavouriteCompetitionsSelectorModal from "Features/sports/components/FavouriteCompetitionsSelectorModal";

type Props = {
  onClose: any => any,
  groupId: number,
};

const CHOOSE_FAVOURITE_COMPETITIONS_QUERY = gql`
  query ChooseFavouriteCompetitions($groupId: Int!) {
    favouriteCompetitions(groupId: $groupId) {
      id
    }
  }
`;

class ChooseFavouriteCompetitionsTypedQuery extends Query<
  ChooseFavouriteCompetitions,
  ChooseFavouriteCompetitionsVariables
> {}

const ChooseFavouriteCompetitionsModal = ({
  onClose,
  groupId = 1000093190,
}: Props) => (
  <ChooseFavouriteCompetitionsTypedQuery
    query={CHOOSE_FAVOURITE_COMPETITIONS_QUERY}
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
              onCancel={onClose}
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
  </ChooseFavouriteCompetitionsTypedQuery>
);

export default ChooseFavouriteCompetitionsModal;
