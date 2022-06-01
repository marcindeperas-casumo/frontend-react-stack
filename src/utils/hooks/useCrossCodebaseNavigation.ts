import { navigate } from "@reach/router";
import { useUrlPrefix, useLanguage } from "Utils/hooks";
import { routeTranslator } from "Utils";

type RouteParamsType = {
  [s: string]: string;
};

type UseCrossCodebaseNavigationType = {
  navigateToKO: (routeId: string, routeParams?: RouteParamsType) => void;
  navigate: (routeId: string, routeParams?: RouteParamsType) => void;
};

export function useCrossCodebaseNavigation(): UseCrossCodebaseNavigationType {
  const basePath = useUrlPrefix();
  const language = useLanguage();
  const translateRoute = routeTranslator(language);

  const getPath = (routeId: string): string => {
    const processedBasePath = basePath ? `/${basePath}` : "";

    return `${processedBasePath}/${translateRoute(routeId)}`;
  };

  const getPathWithParams = (path: string, params?: RouteParamsType): string =>
    `${substitutePathParams(path, params)}`;

  return {
    // @ts-expect-error ts-migrate(1015) FIXME: Parameter cannot have question mark and initialize... Remove this comment to see the full error message
    navigateToKO: (routeId: string, routeParams?: RouteParamsType = {}) => {
      const url = getPathWithParams(getPath(routeId), routeParams);

      window.location.replace(url);
    },
    // @ts-expect-error ts-migrate(1015) FIXME: Parameter cannot have question mark and initialize... Remove this comment to see the full error message
    navigate: (routeId: string, routeParams?: RouteParamsType = {}) => {
      const url = getPathWithParams(getPath(routeId), routeParams);

      navigate(url);
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
