import { replace } from "ramda";
import { routeTranslator } from "Utils/routerUtils";
import { useLanguage } from "./useLanguage";
import { useUrlPrefix } from "./useUrlPrefix";

export const useTranslatedUrl = (
  routeId: string,
  params: { [key: string]: string } = {}
) => {
  const language = useLanguage();
  const prefix = useUrlPrefix();

  const prefixPart = prefix ? `${prefix}/` : "";

  const translatedRoute = routeTranslator(language)(routeId);
  const paramsInterpolatedRoute = Object.keys(params).reduce(
    (acc, cur) => replace(`:${cur}`, params[cur], acc),
    translatedRoute
  );

  return `${prefixPart}${paramsInterpolatedRoute}`;
};
