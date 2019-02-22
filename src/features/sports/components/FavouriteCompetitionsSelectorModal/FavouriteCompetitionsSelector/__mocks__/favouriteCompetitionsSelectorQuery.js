import footballData from "./football";
import { FAVOURITE_COMPETITIONS_SELECTOR_QUERY } from "../FavouriteCompetitionsSelector";

export default [
  {
    request: {
      query: FAVOURITE_COMPETITIONS_SELECTOR_QUERY,
      variables: {
        groupId: 1,
      },
    },
    result: footballData,
  },
];
