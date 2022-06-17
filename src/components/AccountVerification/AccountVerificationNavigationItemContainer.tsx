import * as React from "react";
import { slugs } from "@casumo/frontend-kyc/dist/models/content.constants";
import { Tracker } from "@casumo/frontend-kyc-react";
import { useGetVerificationItems } from "Models/kyc/hooks";
import { useGetContent } from "Models/cms/hooks/useGetContent";

export function AccountVerificationNavigationItemContainer() {
  const items = useGetVerificationItems();
  const { isLoading, data } = useGetContent({
    slug: slugs.KYC_LIST,
  });

  const label = isLoading || !data ? "" : data.fields.header;

  return <Tracker short label={label} items={items} />;
}
