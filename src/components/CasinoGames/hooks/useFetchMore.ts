import * as A from "Types/apollo";
import { gameListRTPLimit } from "../Constants";

type TfetchMoreVariables = {
  variables: A.GetGamesRtpQueryVariables;
};

type TfetchMoreGamesPaginated = {
  data: A.GetGamesRtpQuery;
};

type TuseFetchMoreProps = {
  fetchMore: (
    variables: TfetchMoreVariables
  ) => Promise<TfetchMoreGamesPaginated>;
  offset: number;
  setOffset: (x: number) => void;
};

export const useFetchMore = ({
  fetchMore,
  setOffset,
  offset,
}: TuseFetchMoreProps) => {
  return () =>
    fetchMore<A.GetGamesRtpQueryVariables>({
      variables: {
        query: "categories=SLOT_MACHINE",
        offset,
        limit: gameListRTPLimit,
      },
    }).then(fetchMoreResult => {
      const gamesPaginatedData = fetchMoreResult?.data?.getGamesPaginated;
      const returnedGames =
        fetchMoreResult?.data?.getGamesPaginated?.games || [];
      // Limit offset to list length - limit (90)
      // Never set limit to 100+ as api throws server error
      const offsetToUse =
        offset + returnedGames.length >= gamesPaginatedData?.gamesCount
          ? gamesPaginatedData?.gamesCount - gameListRTPLimit
          : offset + returnedGames.length;
      setOffset(offsetToUse);
    });
};
