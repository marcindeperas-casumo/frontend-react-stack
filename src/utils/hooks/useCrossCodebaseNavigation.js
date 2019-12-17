// @flow
import { useUrlPrefix, useLanguage } from "Utils/hooks";
import { routeTranslator } from "Utils";

export function useCrossCodebaseNavigation() {
  const basePath = useUrlPrefix();
  const language = useLanguage();
  const translateRoute = routeTranslator(language);

  return {
    navigateToKO: (routeId: string) => {
      const processedBasePath = basePath ? `/${basePath}` : "";
      const path = `${processedBasePath}/${translateRoute(routeId)}`;

      window.location.replace(`${path}`);
    },
  };
}
