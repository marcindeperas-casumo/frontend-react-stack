import { FAVOURITE_COMPETITIONS_SELECTOR_QUERY } from "../FavouriteCompetitionsSelector";
import footballData from "./football";

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
