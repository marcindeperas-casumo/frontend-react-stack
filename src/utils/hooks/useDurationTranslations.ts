import { DurationTranslations } from "Components/Duration/Duration.types";
import { useTranslations } from "./useTranslations";

export function useDurationTranslations() {
  return useTranslations<DurationTranslations>("i18n.durations");
}
