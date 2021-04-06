import { replace } from "ramda";
import { routeTranslator } from "Utils/routerUtils";
import { useLanguage } from "./useLanguage";

export const useTranslatedUrl = (
  routeId: string,
  params: { [key: string]: string } = {}
) => {
  const language = useLanguage();
  const translatedRoute = routeTranslator(language)(routeId);

  return Object.keys(params).reduce(
    (acc, cur) => replace(`:${cur}`, params[cur], acc),
    translatedRoute
  );
};
