import * as React from "react";
import { TType } from "@casumo/frontend-kyc/dist/models/verification-item.types";
import {
  Tile,
  ItemSkeleton,
  SummarySkeleton,
} from "@casumo/frontend-kyc-react";
import { AccountVerificationBreadcrumbContainer } from "./AccountVerificationBreadcrumbContainer";

export type RootOptions = {
  active?: TType;
  list?: boolean;
  interchanges?: boolean;
  header?: boolean;
};

export function AccountVerificationRootLoading() {
  return (
    <section className="mx-auto tablet:p-md" style={{ maxWidth: 1080 - 48 }}>
      <header className="hidden tablet:block mb-xlg mt-lg">
        <AccountVerificationBreadcrumbContainer />
      </header>
      <Tile className="overflow-hidden">
        <div className="grid tablet:grid-cols-7 divide-x divide-grey-0">
          <div className="tablet:p-md col-span-3 pb-none border-t border-grey-0 hidden tablet:flex">
            <SummarySkeleton />
          </div>
          <div className="col-span-4 flex-col hidden tablet:flex">
            <div className="tablet:p-md">
              <ItemSkeleton />
            </div>
          </div>
        </div>
      </Tile>
    </section>
  );
}
