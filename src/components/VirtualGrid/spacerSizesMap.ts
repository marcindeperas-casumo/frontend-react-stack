// @flow
// This file exist so we can mock it, couldn't figure out mocking of scss file
import * as R from "ramda";
import spacerSizesMap from "./spacerSizesMap.scss";

export default R.map(parseInt, spacerSizesMap);
