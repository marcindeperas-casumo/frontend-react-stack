import { defaultComponentLoader } from "../../utils";

export default defaultComponentLoader(() =>
  import("./LiveCasinoLobbyContainer")
);
