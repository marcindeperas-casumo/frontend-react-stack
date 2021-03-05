// This file exist so we can mock it, couldn't figure out mocking of scss file
import * as R from "ramda";
import _spacerSizesMap from "./spacerSizesMap.scss";

const spacerSizesMap: {
  xs: number;
  sm: number;
  default: number;
  md: number;
  lg: number;
  xlg: number;
  "2xlg": number;
  "3xlg": number;
  "4xlg": number;
} = R.map(parseInt, _spacerSizesMap);

export default spacerSizesMap;
