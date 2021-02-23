// @flow
import * as React from "react";
import { useQuery } from "@apollo/client";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationsGql";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { SettingsAccountDetails } from "./SettingsAccountDetails";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './PlayerSettingsQuery.graphql'... Remove this comment to see the full error message
import { PLAYER_SETTINGS_QUERY } from "./PlayerSettingsQuery.graphql";

export function SettingsAccountDetailsContainer() {
  const { t, loading: cmsLoading } = useTranslationsGql({
    name: "root:player-settings-component:fields.account_settings_name_label",
    email: "root:player-settings-component:fields.account_settings_email_label",
    password:
      "root:player-settings-component:fields.account_settings_password_label",
    mobileNumber:
      "root:player-settings-component:fields.account_settings_mobile_number_label",
    address:
      "root:player-settings-component:fields.account_settings_address_label",
    edit: "root:player-settings-component:fields.account_settings_edit_label",
    verify:
      "root:player-settings-component:fields.account_settings_verify_label",
    gamblingExtent: "root:mobile.settings:fields.gambling_extent_label",
  });
  const { data, error, loading, refetch } = useQuery<
    A.PLAYER_SETTINGS_QUERY,
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '_'.
    _
  >(PLAYER_SETTINGS_QUERY);

  if (cmsLoading || loading) {
    return <SettingsRowListSkeleton count={6} />;
  }
  if (!data || error) {
    // @ts-expect-error ts-migrate(2322) FIXME: Type 'Promise<ApolloQueryResult<PLAYER_SETTINGS_QU... Remove this comment to see the full error message
    return <ErrorMessage retry={() => refetch()} />;
  }

  return (
    <SettingsAccountDetails
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      labels={t}
      player={data.player}
      refetchSettings={refetch}
    />
  );
}
