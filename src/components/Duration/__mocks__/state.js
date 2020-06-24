// @flow
import { CMS_SLUG } from "../Duration.constants";
import tMock from "./translations.js";

export default ({
  schema: {
    cms: {
      [CMS_SLUG]: {
        fields: tMock,
      },
    },
  },
});