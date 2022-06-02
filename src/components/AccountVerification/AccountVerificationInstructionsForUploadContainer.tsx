import * as React from "react";
import { TVerificationItem } from "@casumo/frontend-kyc/dist/models/verification-item.types";
import { states } from "@casumo/frontend-kyc/dist/models/verification-item.constants";
import { mapItemToRejectionReasons } from "@casumo/frontend-kyc/dist/mappers/verification-item.mappers";
import { content as pendingApprovalContent } from "@casumo/frontend-kyc/dist/content/kyc.item.state.pending-approval.mocks";
import { TCmsPage } from "@casumo/frontend-kyc/dist/shared/content.types";
import {
  ItemNone,
  ItemPendingApproval,
  checklistStates,
} from "@casumo/frontend-kyc-react";
import { useCrossCodebaseNavigation } from "Utils/hooks";
import { mapItemToParams } from "Models/kyc/kyc.router";
import { ROUTE_IDS } from "Src/constants";

type Props = {
  item: TVerificationItem;
  content: {
    type: TCmsPage;
    item: TCmsPage;
    base: TCmsPage;
  };
};

const stateToComponent = {
  [states.PENDING_APPROVAL]: ItemPendingApproval,
};

export function AccountVerificationInstructionsForUploadContainer({
  content,
  item,
}: Props) {
  const { navigate } = useCrossCodebaseNavigation();

  const StateComponent = stateToComponent[item.state];
  const ItemComponent = StateComponent || ItemNone;

  const rejectionReasons = mapItemToRejectionReasons(item, content);

  const contentApplied = StateComponent
    ? {
        header: content.type.fields.header,
        title: pendingApprovalContent.fields.title,
        description: pendingApprovalContent.fields.description,
        suggestion: pendingApprovalContent.fields.suggestion,
        reupload: pendingApprovalContent.fields.reupload,
      }
    : {
        header: content.type.fields.header,
        title: content.type.fields.title,
        description: content.type.fields.description,
        checklist: {
          title: content.type.fields.checklist_title,
          steps: content.type.fields.checklist_steps.map((text: string) => ({
            text,
          })),
        },
        checklistFails: rejectionReasons.length
          ? {
              title: content.base.fields.rejection_title,
              steps: mapItemToRejectionReasons(item, content).map(reason => ({
                text: reason.description,
                state: checklistStates.FAIL,
              })),
            }
          : null,
        upload: content.item.fields.upload,
      };

  return (
    <div className="tablet:pt-md tablet:px-md border-t border-grey-0">
      <ItemComponent // @ts-ignore
        content={contentApplied}
        onHeaderAction={() => navigate(ROUTE_IDS.ACCOUNT_VERIFICATION)}
        onAction={() => {
          navigate(
            ROUTE_IDS.ACCOUNT_VERIFICATION_UPLOAD,
            mapItemToParams(item)
          );
        }}
      />
    </div>
  );
}
