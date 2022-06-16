import { TProgressWithStepsProps } from "Components/Progress";
import { ModalStep1 } from "./ModalStep1";
import { ModalStep2 } from "./ModalStep2";

export const steps: TProgressWithStepsProps["steps"] = [
  {
    label: "1",
    isActive: true,
  },
  {
    label: "2",
    isActive: false,
  },
];

export const stepContents = [ModalStep1, ModalStep2];
