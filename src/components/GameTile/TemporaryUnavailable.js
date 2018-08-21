import React from "react";
import CMSField from "../../containers/CMSField";

const TemporaryUnavailable = () => (
  <React.Fragment>
    {<CMSField slug="mobile.game-details" field="game_in_maintenance_text" />}
  </React.Fragment>
);

export default TemporaryUnavailable;
