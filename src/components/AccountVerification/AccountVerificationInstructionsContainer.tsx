import * as React from "react";
import { ItemSkeleton } from "@casumo/frontend-kyc-react";
import { mapItemToDefiningString } from "@casumo/frontend-kyc/dist/mappers/verification-item.mappers";
import { getTypeContent } from "@casumo/frontend-kyc/dist/mappers/content.mappers";
import { isSurveyType } from "@casumo/frontend-kyc/dist/validators/verification-item.validators";
import { slugs } from "@casumo/frontend-kyc/dist/models/content.constants";
import { useGetContent } from "Models/cms/hooks/useGetContent";
import { useGetVerificationItem } from "Models/kyc/hooks";
import { AccountVerificationInstructionsForUploadContainer } from "./AccountVerificationInstructionsForUploadContainer";
import { AccountVerificationInstructionsForSurveyContainer } from "./AccountVerificationInstructionsForSurveyContainer";
import { AccountVerificationRootContainer } from "./AccountVerificationRootContainer";

export function AccountVerificationInstructionsContainer() {
  const item = useGetVerificationItem();

  const baseContent = useGetContent({
    slug: slugs.KYC,
  });

  const itemContent = useGetContent({
    slug: slugs.KYC_ITEM,
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

  const isTypeContentReady =
    item && itemPlayerContent.data && itemPaymentContent.data;

  const typeContentCandidates = isTypeContentReady && [
    ...itemPlayerContent.data.children,
    ...itemPaymentContent.data.children,
  ];

  const typeContent =
    isTypeContentReady && getTypeContent(item, typeContentCandidates);

  const isLoading =
    baseContent.isLoading ||
    fallbackContent.isLoading ||
    itemContent.isLoading ||
    itemPlayerContent.isLoading ||
    itemPaymentContent.isLoading;

  const isData =
    baseContent.data &&
    fallbackContent.data &&
    itemContent.data &&
    itemPlayerContent.data &&
    itemPaymentContent.data;

  const isSurvey = isSurveyType(item?.type);
  const Container = isSurvey
    ? AccountVerificationInstructionsForSurveyContainer
    : AccountVerificationInstructionsForUploadContainer;

  const active = item ? mapItemToDefiningString(item) : null;

  return (
    <AccountVerificationRootContainer
      options={{
        header: false,
        active,
      }}
    >
      {item && !isLoading && isData ? (
        <Container
          item={item}
          content={{
            base: baseContent.data,
            item: itemContent.data,
            type: typeContent || fallbackContent.data,
          }}
        />
      ) : (
        <ItemSkeleton />
      )}
    </AccountVerificationRootContainer>
  );
}
