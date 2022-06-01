import * as React from "react";
import { content as itemContent } from "@casumo/frontend-kyc/dist/content/kyc.item.mocks";
import { AccountVerification } from "./AccountVerification";
import { AccountVerificationRootContainer } from "./AccountVerificationRootContainer";

export function AccountVerificationContainer() {
  return (
    <AccountVerificationRootContainer
      options={{
        list: true,
        interchanges: true,
        header: true,
      }}
    >
      <AccountVerification
        content={{
          introduction: {
            title: itemContent.fields.empty_title,
            text: itemContent.fields.empty_text,
          },
        }}
      />
    </AccountVerificationRootContainer>
  );
}
