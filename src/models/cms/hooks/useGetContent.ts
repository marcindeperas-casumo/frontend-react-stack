import { useSelector } from "react-redux";
import { languageSelector } from "Models/handshake";
import { useGetPageBySlugQuery } from "Models/cms/cms.api";
import { TGetPageBySlugArg, TCmsPage } from "Models/cms/cms.types";
import { LANGUAGES } from "Src/constants";

export type TUseGetContentResponse = { data?: TCmsPage; isLoading: boolean };

export const useGetContent = (
  options: TGetPageBySlugArg
): TUseGetContentResponse => {
  const language = useSelector(languageSelector);

  return useGetPageBySlugQuery({
    slug: options.slug,
    language: options.language || language || LANGUAGES.in_en,
    withChildren: options.withChildren || false,
  });
};
