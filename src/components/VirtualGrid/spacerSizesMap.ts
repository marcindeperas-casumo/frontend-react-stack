// @flow
// This file exist so we can mock it, couldn't figure out mocking of scss file
import * as R from "ramda";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './spacerSizesMap.scss' or its ... Remove this comment to see the full error message
import spacerSizesMap from "./spacerSizesMap.scss";

export default R.map(parseInt, spacerSizesMap);
