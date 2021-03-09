import { useUrlPrefix, useLanguage } from "Utils/hooks";
import { routeTranslator } from "Utils";

type RouteParamsType = {
  [s: string]: string;
};

type UseCrossCodebaseNavigationType = {
  navigateToKO: (routeId: string, routeParams?: RouteParamsType) => void;
};

export function useCrossCodebaseNavigation(): UseCrossCodebaseNavigationType {
  const basePath = useUrlPrefix();
  const language = useLanguage();
  const translateRoute = routeTranslator(language);

  return {
    // @ts-expect-error ts-migrate(1015) FIXME: Parameter cannot have question mark and initialize... Remove this comment to see the full error message
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
