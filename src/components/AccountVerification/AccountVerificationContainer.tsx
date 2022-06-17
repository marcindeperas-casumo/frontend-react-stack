import * as React from "react";
import { slugs } from "@casumo/frontend-kyc/dist/models/content.constants";
import { ItemSkeleton } from "@casumo/frontend-kyc-react";
import { useGetContent } from "Models/cms/hooks/useGetContent";
import { AccountVerification } from "./AccountVerification";
import { AccountVerificationRootContainer } from "./AccountVerificationRootContainer";

export function AccountVerificationContainer() {
  const itemContent = useGetContent({
    slug: slugs.KYC_ITEM,
    withChildren: true,
  });

  if (itemContent.isLoading || !itemContent.data) {
    return (
      <AccountVerificationRootContainer
        options={{
          list: true,
          interchanges: false,
          header: true,
        }}
      >
        <div className="tablet:p-md">
          <ItemSkeleton />
        </div>
      </AccountVerificationRootContainer>
    );
  }

  return (
    <AccountVerificationRootContainer
      options={{
        list: true,
        interchanges: false,
        header: true,
      }}
    >
      <AccountVerification
        content={{
          introduction: {
            title: itemContent.data.fields.empty_title,
            text: itemContent.data.fields.empty_text,
          },
        }}
      />
    </AccountVerificationRootContainer>
  );
}
