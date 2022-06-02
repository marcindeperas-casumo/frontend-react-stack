import React from "react";
import lowerCase from "lodash.lowercase";
import capitalize from "lodash.capitalize";
import { content as listContent } from "@casumo/frontend-kyc/dist/content/kyc.list.mocks";
import { content as itemContent } from "@casumo/frontend-kyc/dist/content/kyc.item.mocks";
import { Breadcrumb } from "@casumo/frontend-kyc-react";
import { getTypeContent } from "@casumo/frontend-kyc/dist/mappers/content.mappers";
import { useGetVerificationItem } from "Models/kyc/hooks";
import { mapItemToParams } from "Models/kyc/kyc.router";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";

export const AccountVerificationBreadcrumbContainer =
  (): React.ReactElement => {
    const { navigate } = useCrossCodebaseNavigation();
    const { pathname } = window.location;
    const item = useGetVerificationItem();

    const typeContent = item
      ? getTypeContent(item, itemContent.children)
      : null;

    const navigateToList = () => {
      navigate(ROUTE_IDS.ACCOUNT_VERIFICATION);
    };

    const links = [
      { onClick: navigateToList, label: listContent.fields.header },
    ];

    const parts = pathname.split(/\//g).filter(Boolean).slice(3);

    const partsWithoutId = [
      ...parts.slice(0, 1),
      ...parts.slice(2, parts.length),
    ];

    const partsLinks = partsWithoutId.map((part, i) => {
      const isTypeInfo = i === 0;

      return isTypeInfo
        ? {
            onClick: () =>
              navigate(
                ROUTE_IDS.ACCOUNT_VERIFICATION_INSTRUCTIONS,
                mapItemToParams(item)
              ),
            label: typeContent
              ? typeContent.fields.header
              : capitalize(lowerCase(part)),
          }
        : {
            onClick: () => {},
            label: capitalize(lowerCase(part)),
          };
    });

    return <Breadcrumb entries={[...links, ...partsLinks]} />;
  };
