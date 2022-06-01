import * as React from "react";
import { ItemSkeleton } from "@casumo/frontend-kyc-react";
import { content as itemContent } from "@casumo/frontend-kyc/dist/content/kyc.item.mocks";
import { content as baseContent } from "@casumo/frontend-kyc/dist/content/kyc.mocks";
import { content as fallbackContent } from "@casumo/frontend-kyc/dist/content/kyc.item.fallback.mocks";
import { mapItemToDefiningString } from "@casumo/frontend-kyc/dist/mappers/verification-item.mappers";
import { getTypeContent } from "@casumo/frontend-kyc/dist/mappers/content.mappers";
import { isSurveyType } from "@casumo/frontend-kyc/dist/validators/verification-item.validators";
import { useGetVerificationItem } from "Models/kyc/hooks";
import { AccountVerificationInstructionsForUploadContainer } from "./AccountVerificationInstructionsForUploadContainer";
import { AccountVerificationInstructionsForSurveyContainer } from "./AccountVerificationInstructionsForSurveyContainer";
import { AccountVerificationRootContainer } from "./AccountVerificationRootContainer";

export function AccountVerificationInstructionsContainer() {
  const item = useGetVerificationItem();

  const isSurvey = isSurveyType(item?.type);
  const Container = isSurvey
    ? AccountVerificationInstructionsForSurveyContainer
    : AccountVerificationInstructionsForUploadContainer;

  const typeContent = item ? getTypeContent(item, itemContent.children) : null;

  return (
    <AccountVerificationRootContainer
      options={{
        header: false,
        active: item ? mapItemToDefiningString(item) : null,
      }}
    >
      {item ? (
        <Container
          item={item}
          content={{
            base: baseContent,
            item: itemContent,
            type: typeContent || fallbackContent,
          }}
        />
      ) : (
        <ItemSkeleton />
      )}
    </AccountVerificationRootContainer>
  );
}
