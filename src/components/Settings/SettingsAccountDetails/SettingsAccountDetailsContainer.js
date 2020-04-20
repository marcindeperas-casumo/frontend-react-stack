// @flow
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { useTranslationsGql } from "Utils/hooks/useTranslationGql";
import { SettingsAccountDetails } from "Components/Settings/SettingsAccountDetails/SettingsAccountDetails";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { ErrorMessage } from "Components/ErrorMessage";
import { PLAYER_SETTINGS_QUERY } from "./PlayerSettingsQuery.graphql";

export function SettingsAccountDetailsContainer() {
  const labels = useTranslationsGql({
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
  const settings = useQuery<A.PLAYER_SETTINGS_QUERY, _>(PLAYER_SETTINGS_QUERY);

  if (labels.loading || settings.loading) {
    return <SettingsRowListSkeleton count={6} />;
  }
  if (!settings.data || settings.error) {
    return <ErrorMessage retry={() => settings.refetch()} />;
  }
  if (!labels.t.name) {
    return <ErrorMessage />;
  }

  return (
    <SettingsAccountDetails
      labels={labels.t}
      player={settings.data.player}
      refetchSettings={settings.refetch}
    />
  );
}
