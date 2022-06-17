import * as React from "react";
import cx from "classnames";
import {
  TVerificationItem,
  TType,
} from "@casumo/frontend-kyc/dist/models/verification-item.types";
import {
  Summary,
  Interchanges,
  Invitation,
  Tile,
  TSummaryContent,
  TInterchange,
  SummarySkeleton,
} from "@casumo/frontend-kyc-react";
import { AccountVerificationBreadcrumbContainer } from "./AccountVerificationBreadcrumbContainer";

export type RootOptions = {
  active?: TType;
  list?: boolean;
  interchanges?: boolean;
  header?: boolean;
};

type Props = {
  options?: RootOptions;
  items: Array<TVerificationItem>;
  content: {
    summary: TSummaryContent;
    interchanges: {
      title: string;
      interchanges: Array<TInterchange>;
    };
    introduction: {
      title: string;
      text: string;
    };
    invitation: {
      suggestion: string;
      assumption: string;
    };
  };
  onInvitationAction: () => void;
  onItemAction: (item: TVerificationItem) => void;
  onHeaderAction?: () => void;
  children?: React.ReactElement;
};

const optionsDefaults = {
  list: false,
  interchanges: false,
  header: false,
};

export function AccountVerificationRoot({
  options,
  content,
  items = [],
  onInvitationAction,
  onItemAction,
  onHeaderAction,
  children,
}: Props) {
  const configuration = { ...optionsDefaults, ...options };

  return (
    <section className="mx-auto tablet:p-md" style={{ maxWidth: 1080 - 48 }}>
      <header className="hidden tablet:block mb-xlg mt-lg">
        <AccountVerificationBreadcrumbContainer />
      </header>
      <Tile className="overflow-hidden">
        <div className="grid tablet:grid-cols-7 divide-x divide-grey-0">
          <div
            className={cx(
              "tablet:p-md col-span-3 pb-none border-t border-grey-0",
              {
                "hidden tablet:flex": !configuration.list,
              }
            )}
          >
            {items ? (
              <Summary
                active={options?.active}
                items={items}
                content={content.summary}
                onInvitationAction={onInvitationAction}
                onItemSelection={onItemAction}
                onHeaderAction={options.header ? onHeaderAction : () => {}}
              />
            ) : (
              <SummarySkeleton />
            )}
          </div>
          <div
            className={cx("col-span-4 flex-col", {
              "hidden tablet:flex": configuration.list,
            })}
          >
            {children}
          </div>
        </div>
      </Tile>
      {configuration.interchanges && (
        <Tile className="tablet:my-md tablet:p-xlg px-md">
          <Interchanges className="text-center" {...content.interchanges} />
        </Tile>
      )}
      <footer className="hidden tablet:block p-md mt-lg">
        <Invitation {...content.invitation} onAction={onInvitationAction} />
      </footer>
    </section>
  );
}
