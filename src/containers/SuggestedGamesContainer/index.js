import { defaultComponentLoader } from "../../utils";

export default defaultComponentLoader({
  loader: () => import("./SuggestedGamesPortal")
});
