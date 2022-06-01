import * as React from "react";
import { capitalize, lowerCase } from "lodash";
import { TVerificationItem } from "@casumo/frontend-kyc/dist/models/verification-item.types";
import { isUploadAvailable } from "@casumo/frontend-kyc/dist/validators/verification-item.validators";
import {
  mapItemToDefiningType,
  mapItemToDefiningString,
} from "@casumo/frontend-kyc/dist/mappers/verification-item.mappers";
import { content as listContent } from "@casumo/frontend-kyc/dist/content/kyc.list.mocks";
import { content as itemContent } from "@casumo/frontend-kyc/dist/content/kyc.item.mocks";
import { content as baseContent } from "@casumo/frontend-kyc/dist/content/kyc.mocks";
import { reduceItemContentToLabels } from "@casumo/frontend-kyc/dist/mappers/content.mappers";
import { reduceListToDictionary } from "@casumo/frontend-kyc/dist/shared/structures.mappers";
import { mapConstantToParameter } from "@casumo/frontend-kyc/dist/shared/router.mappers";
import { useGetVerificationItems } from "Models/kyc/hooks";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { ROUTE_IDS } from "Src/constants";
import {
  AccountVerificationRoot,
  RootOptions,
} from "./AccountVerificationRoot";

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

  const types = items
    ? items.reduce(
        (l, item) => ({
          ...l,
          [mapItemToDefiningType(item)]: capitalize(
            lowerCase(mapItemToDefiningType(item))
          ),
        }),
        {}
      )
    : [];

  return (
    <AccountVerificationRoot
      options={options}
      items={items}
      content={{
        interchanges: {
          title: "Q&A",
          interchanges: listContent.fields.interchanges,
        },
        introduction: {
          title: itemContent.fields.empty_title,
          text: itemContent.fields.empty_text,
        },
        summary: {
          header: options?.header && listContent.fields.header,
          title: listContent.fields.title,
          instructions: listContent.fields.instructions,
          labels: {
            types: { ...types, ...reduceItemContentToLabels(itemContent) },
            states: reduceListToDictionary(baseContent.fields.states),
          },
        },
        invitation: {
          assumption: listContent.fields.invitation_assumption,
          suggestion: listContent.fields.invitation_suggestion,
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
          navigate(ROUTE_IDS.ACCOUNT_VERIFICATION_INSTRUCTIONS, {
            type: mapConstantToParameter(mapItemToDefiningString(item)),
          });
        }
      }}
    >
      {children}
    </AccountVerificationRoot>
  );
}
