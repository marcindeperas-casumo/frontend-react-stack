import { CMS_SLUG } from "../Duration.constants";
import tMock from "./translations";

export default ({
  schema: {
    cms: {
      [CMS_SLUG]: {
        fields: tMock,
      },
    },
  },
});