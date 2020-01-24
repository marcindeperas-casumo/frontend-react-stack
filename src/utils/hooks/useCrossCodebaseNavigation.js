// @flow
import { useUrlPrefix, useLanguage } from "Utils/hooks";
import { routeTranslator } from "Utils";

type RouteParamsType = {
  [string]: string,
};

type UseCrossCodebaseNavigationType = {
  navigateToKO: (routeId: string, routeParams?: RouteParamsType) => void,
};

export function useCrossCodebaseNavigation(): UseCrossCodebaseNavigationType {
  const basePath = useUrlPrefix();
  const language = useLanguage();
  const translateRoute = routeTranslator(language);

  return {
    navigateToKO: (routeId: string, routeParams?: RouteParamsType = {}) => {
      const processedBasePath = basePath ? `/${basePath}` : "";
      const path = `${processedBasePath}/${translateRoute(routeId)}`;

      window.location.replace(`${substitutePathParams(path, routeParams)}`);
    },
  };
}

function substitutePathParams(
  path: string,
  routeParams: RouteParamsType
): string {
  return Object.entries(routeParams).reduce(
    (reducedPath, [routeParamName, routeParamValue]) => {
      return reducedPath.replace(`:${routeParamName}`, String(routeParamValue));
    },
    path
  );
}
