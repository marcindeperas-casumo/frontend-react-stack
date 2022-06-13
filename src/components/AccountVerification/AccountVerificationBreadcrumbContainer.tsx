import React from "react";
import lowerCase from "lodash.lowercase";
import capitalize from "lodash.capitalize";
import { Breadcrumb } from "@casumo/frontend-kyc-react";
import { getTypeContent } from "@casumo/frontend-kyc/dist/mappers/content.mappers";
import { slugs } from "@casumo/frontend-kyc/dist/models/content.constants";
import { useGetContent } from "Models/cms/hooks/useGetContent";
import { useGetVerificationItem } from "Models/kyc/hooks";
import { mapItemToParams } from "Models/kyc/kyc.router";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";

export const AccountVerificationBreadcrumbContainer =
  (): React.ReactElement => {
    const { navigate } = useCrossCodebaseNavigation();
    const { pathname } = window.location;
    const item = useGetVerificationItem();

    const listContent = useGetContent({
      slug: slugs.KYC_LIST,
    });

    const itemPlayerContent = useGetContent({
      slug: slugs.KYC_ITEM_PLAYER,
      withChildren: true,
    });

    const itemPaymentContent = useGetContent({
      slug: slugs.KYC_ITEM_PAYMENT,
      withChildren: true,
    });

    const fallbackContent = useGetContent({
      slug: slugs.KYC_ITEM_PLAYER_FALLBACK,
    });

    const isLoading =
      fallbackContent.isLoading ||
      itemPlayerContent.isLoading ||
      itemPaymentContent.isLoading;

    if (isLoading) {
      return <Breadcrumb entries={[]} />;
    }

    const isTypeContentReady =
      item && itemPlayerContent.data && itemPaymentContent.data;

    const typeContentCandidates = isTypeContentReady && [
      ...itemPlayerContent.data.children,
      ...itemPaymentContent.data.children,
    ];

    const typeContent =
      (isTypeContentReady && getTypeContent(item, typeContentCandidates)) ||
      fallbackContent.data;

    const navigateToList = () => {
      navigate(ROUTE_IDS.ACCOUNT_VERIFICATION);
    };

    const links = [
      { onClick: navigateToList, label: listContent.data.fields.header },
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
