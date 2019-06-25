// @flow
import React, { PureComponent, type Node } from "react";
import { ExclamationMarkIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";
import { SettingsLabelAndValue } from "Components/Settings/SettingsLabelAndValue/SettingsLabelAndValue";
import { launchModal } from "Services/LaunchModalService";
import { MODALS, KO_EVENTS } from "Src/constants";
import { SettingsRow } from "Components/Settings/SettingsRow/SettingsRow";
import { PASSWORD_PLACEHOLDER_VALUE, onOldStackEvent } from "./utils";
import EditIcon from "./EditIcon.svg"; //TODO: replace on cudl v2 bump

type Props = {
  player: SETTINGS_PLAYER,
  labels: PLAYER_SETTINGS_LABELS_QUERY,
  refetchSettings: () => {},
};

const { ACCOUNT_SETTINGS } = MODALS;

const RowTemplate = ({
  label,
  value,
  action,
}: {
  label: string,
  value?: Node,
  action?: Node,
}) => (
  <SettingsRow text={<SettingsLabelAndValue label={label} value={value} />}>
    {action}
  </SettingsRow>
);

export class SettingsAccountDetails extends PureComponent<Props> {
  static defaultProps = {
    labels: {},
  };

  componentDidMount() {
    const { refetchSettings } = this.props;
    onOldStackEvent(KO_EVENTS.ACCOUNT_SETTINGS.COMMAND_EXECUTED, data => {
      if (data.success) {
        refetchSettings();
      }
    });
  }

  render() {
    const {
      labels,
      player: { details },
    } = this.props;

    const Name = () => (
      <RowTemplate
        label={labels.name}
        value={`${details.name.first} ${details.name.last}`}
      />
    );

    const Email = () => (
      <a onClick={() => launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_EMAIL })}>
        <RowTemplate
          label={labels.email}
          value={details.email}
          action={<EditIcon className="t-color-green" />}
        />
      </a>
    );

    const ExtentOfGambling = () => {
      if (details.extentOfGambling.canChange) {
        return (
          <a
            onClick={() =>
              launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_EXTENT_OF_GAMBLING })
            }
          >
            <RowTemplate
              label={labels.gamblingExtent}
              action={<EditIcon className="t-color-green" />}
              value={details.extentOfGambling.label}
            />
          </a>
        );
      }
      return null;
    };

    const Password = () => {
      if (details.canChangePassword) {
        return (
          <a
            onClick={() =>
              launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_PASSWORD })
            }
          >
            <RowTemplate
              label={labels.password}
              value={PASSWORD_PLACEHOLDER_VALUE}
              action={<EditIcon className="t-color-green" />}
            />
          </a>
        );
      }
      return null;
    };

    const VerifiedMobileNumber = () => (
      <a
        onClick={() =>
          launchModal({ modal: ACCOUNT_SETTINGS.CHANGE_MOBILE_NUMBER })
        }
      >
        <RowTemplate
          label={labels.mobileNumber}
          value={`(${details.phoneNumber.prefix}) ${details.phoneNumber.number}`}
          action={<EditIcon className="t-color-green" />}
        />
      </a>
    );

    const UnverifiedMobileNumber = () => (
      <a href="/player/settings/phone-number">
        <RowTemplate
          label={labels.mobileNumber}
          value={`(${details.phoneNumber.prefix}) ${details.phoneNumber.number}`}
          action={
            <>
              <ExclamationMarkIcon className="t-color-red" />
              <Text tag="span" size="sm" className="t-color-red">
                Verify
              </Text>
            </>
          }
        />
      </a>
    );

    const MobileNumber = () =>
      details.phoneNumber.verified ? (
        <VerifiedMobileNumber />
      ) : (
        <UnverifiedMobileNumber />
      );

    const Address = () => (
      <RowTemplate
        label={labels.address}
        value={
          <>
            <div>{details.address.street}</div>
            <div>{details.address.postCode}</div>
            <div>{details.address.city}</div>
            <div>{details.address.country.name}</div>
          </>
        }
      />
    );

    return (
      <>
        <Name />
        <Email />
        <ExtentOfGambling />
        <Password />
        <MobileNumber />
        <Address />
      </>
    );
  }
}
