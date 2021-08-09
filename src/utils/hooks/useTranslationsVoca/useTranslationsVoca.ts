import { useLanguage } from "../useLanguage";
import { useTranslations } from "../useTranslations";
import { TUseTranslationsVoca } from "./useTranslationsVoca.types";

export function useTranslationsVoca(): TUseTranslationsVoca | null {
  const lang = useLanguage();
  const vocaFields = useTranslations<{ json_vocas: string }>(
    `vocas.vocas-${lang}`
  );

  try {
    return JSON.parse(vocaFields?.json_vocas);
  } catch {
    return null;
  }
}
