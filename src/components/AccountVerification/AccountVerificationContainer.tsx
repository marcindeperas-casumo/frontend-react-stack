import * as React from "react";
import { slugs } from "@casumo/frontend-kyc/dist/models/content.constants";
import { ItemSkeleton } from "@casumo/frontend-kyc-react";
import { useGetVerificationItems } from "Models/kyc/hooks";
import { useGetContent } from "Models/cms/hooks/useGetContent";
import { AccountVerification } from "./AccountVerification";
import { AccountVerificationRootContainer } from "./AccountVerificationRootContainer";

export function AccountVerificationContainer() {
  const items = useGetVerificationItems();
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
          introduction:
            items && items.length
              ? {
                  title: itemContent.data.fields.empty_title,
                  text: itemContent.data.fields.empty_text,
                }
              : { title: "", text: "" },
        }}
      />
    </AccountVerificationRootContainer>
  );
}
