import * as React from "react";
import { TVerificationItem } from "@casumo/frontend-kyc/dist/models/verification-item.types";
import { isUploadAvailable } from "@casumo/frontend-kyc/dist/validators/verification-item.validators";
import { slugs } from "@casumo/frontend-kyc/dist/models/content.constants";
import { reduceContentsToLabels } from "@casumo/frontend-kyc/dist/mappers/content.mappers";
import { reduceListToDictionary } from "@casumo/frontend-kyc/dist/shared/structures.mappers";
import { mapItemToParams } from "Models/kyc/kyc.router";
import { useGetVerificationItems } from "Models/kyc/hooks";
import { useGetContent } from "Models/cms/hooks/useGetContent";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import {
  AccountVerificationRoot,
  RootOptions,
} from "./AccountVerificationRoot";
import { AccountVerificationRootLoading } from "./AccountVerificationRootLoading";

type Props = {
  options?: RootOptions;
  children: React.ReactElement;
};

export function AccountVerificationRootContainer({
  options = {},
  children,
}: Props) {
  const { navigate } = useCrossCodebaseNavigation();
  const items = useGetVerificationItems();

  const baseContent = useGetContent({
    slug: slugs.KYC,
  });

  const listContent = useGetContent({
    slug: slugs.KYC_LIST,
  });

  const itemContent = useGetContent({
    slug: slugs.KYC_ITEM,
    withChildren: true,
  });

  const itemPlayerContent = useGetContent({
    slug: slugs.KYC_ITEM_PLAYER,
    withChildren: true,
  });

  const itemPaymentContent = useGetContent({
    slug: slugs.KYC_ITEM_PAYMENT,
    withChildren: true,
  });

  const isLoading =
    baseContent.isLoading ||
    listContent.isLoading ||
    itemContent.isLoading ||
    itemPlayerContent.isLoading ||
    itemPaymentContent.isLoading;

  const isData =
    baseContent.data &&
    listContent.data &&
    itemContent.data &&
    itemPlayerContent.data &&
    itemPaymentContent.data;

  if (isLoading || !isData) {
    return <AccountVerificationRootLoading />;
  }

  return (
    <AccountVerificationRoot
      options={options}
      items={items}
      content={{
        interchanges: {
          title: listContent.data.fields.interchanges_title,
          interchanges: listContent.data.fields.interchanges,
        },
        introduction: {
          title: itemContent.data.fields.empty_title,
          text: itemContent.data.fields.empty_text,
        },
        summary: {
          header: options?.header && listContent.data.fields.header,
          title: items.length
            ? listContent.data.fields.title
            : listContent.data.fields.title_empty,
          instructions: items.length
            ? listContent.data.fields.instructions
            : "",
          labels: {
            types: reduceContentsToLabels([
              itemPlayerContent.data,
              itemPaymentContent.data,
            ]),
            states: reduceListToDictionary(baseContent.data.fields.states),
          },
        },
        invitation: {
          assumption: listContent.data.fields.invitation_assumption,
          suggestion: listContent.data.fields.invitation_suggestion,
        },
      }}
      onInvitationAction={() => {
        if (window && window.Intercom) {
          window.Intercom("show");
        } else {
          console.warn("Intercom is not present on the window object");
        }
      }}
      onItemAction={(item: TVerificationItem) => {
        if (isUploadAvailable(item)) {
          navigate(
            ROUTE_IDS.ACCOUNT_VERIFICATION_INSTRUCTIONS,
            mapItemToParams(item)
          );
        }
      }}
    >
      {children}
    </AccountVerificationRoot>
  );
}
