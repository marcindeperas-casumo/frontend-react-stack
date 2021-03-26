import { createModifierClasses } from "@casumo/cudl-react-utils";
import {
  horizontalListsDevicePaddings,
  horizontalListDeviceTopMargin,
} from "Src/constants";

export const leftPaddingClasses = createModifierClasses(
  "u-padding-left",
  horizontalListsDevicePaddings
).join(" ");

export const rightPaddingClasses = createModifierClasses(
  "u-padding-right",
  horizontalListsDevicePaddings
).join(" ");

export const xPaddingClasses = createModifierClasses(
  "u-padding-x",
  horizontalListsDevicePaddings
).join(" ");

export const topMarginClasses = createModifierClasses(
  "u-margin-top",
  horizontalListDeviceTopMargin
).join(" ");
