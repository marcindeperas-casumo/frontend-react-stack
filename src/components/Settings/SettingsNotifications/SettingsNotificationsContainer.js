// @flow
import * as React from "react";
import { Mutation, Query } from "react-apollo";
import { adopt } from "react-adopt";
import { connect } from "react-redux";
import { jurisdictionSelector } from "Models/handshake";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { dataIdFromObject } from "Services/apolloCacheUtils";
import { ErrorMessage } from "Components/ErrorMessage";
import logger from "Services/logger";
import {
  SetAdventurerPublicity,
  SetWithdrawalNotifications,
  SetContactByPost,
  SetContactByPhone,
  SetNewsletterSubscription,
  SetSMSNewsletterSubscription,
} from "./Mutations.graphql";
import {
  PLAYER_CONTACT_SETTINGS_QUERY,
  WITHDRAWAL_NOTIFICATION_FRAGMENT,
  ADVENTURER_PUBLIC_FRAGMENT,
  SUBSCRIBED_TO_NEWSLETTERS_FRAGMENT,
  SUBSCRIBED_TO_SMS_NEWSLETTERS_FRAGMENT,
  CONTACT_BY_PHONE_FRAGMENT,
  CONTACT_BY_POST_FRAGMENT,
} from "./PlayerContactSettingsQuery";
import NOTIFICATIONS_LABELS_QUERY from "./SettingsNotificationsLabelsQuery.graphql";
import { SettingsNotifications } from "./SettingsNotifications";

const noop = () => {};

const Composed = adopt({
  setWithdrawalNotifications: ({ render }) => (
    //TODO: implement error handling when we have notifications in place
    //if onError is unset, Apollo default handler throws and tests break
    <Mutation mutation={SetWithdrawalNotifications} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  setAdventurerPublicity: ({ render }) => (
    <Mutation mutation={SetAdventurerPublicity} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  setContactByPost: ({ render }) => (
    <Mutation mutation={SetContactByPost} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  setContactByPhone: ({ render }) => (
    <Mutation mutation={SetContactByPhone} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  setNewsletterSubscription: ({ render }) => (
    <Mutation mutation={SetNewsletterSubscription} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  setSMSNewsletterSubscription: ({ render }) => (
    <Mutation mutation={SetSMSNewsletterSubscription} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  labels: ({ render }) => (
    <Query query={NOTIFICATIONS_LABELS_QUERY}>{render}</Query>
  ),
  playerContactSettings: ({ render }) => (
    <Query query={PLAYER_CONTACT_SETTINGS_QUERY}>{render}</Query>
  ),
});

const wrapMutation = ({
  mutation,
  input,
  optimisticResponse,
  playerId,
  fragment,
  getContactSettingsField,
}) =>
  mutation({
    variables: { input: { on: input } },
    optimisticResponse,
    update: (cache, result) => {
      try {
        cache.writeFragment({
          id: dataIdFromObject({ __typename: "Player", id: playerId }),
          fragment,
          data: {
            details: {
              __typename: "PlayerDetails",
              contactSettings: {
                ...getContactSettingsField(result),
                __typename: "PlayerContactSettings",
              },
            },
            __typename: "Player",
          },
        });
      } catch (err) {
        logger.error(
          "Contact Settings/Notifications: Failed while writing fragment",
          err
        );
      }
    },
  });

export const withContainer = (Component: Function) => (
  <Composed>
    {({
      setAdventurerPublicity,
      setWithdrawalNotifications,
      setContactByPost,
      setContactByPhone,
      setNewsletterSubscription,
      setSMSNewsletterSubscription,
      labels,
      playerContactSettings,
    }) => {
      if (playerContactSettings.loading || labels.loading) {
        return <SettingsRowListSkeleton count={8} />;
      }
      if (playerContactSettings.error) {
        return <ErrorMessage retry={() => playerContactSettings.refetch()} />;
      }
      if (labels.error) {
        return <ErrorMessage retry={() => labels.refetch()} />;
      }

      const {
        player: { id },
      } = playerContactSettings.data;

      return (
        <Component
          labels={labels.data}
          player={playerContactSettings.data.player}
          setWithdrawalNotifications={value =>
            wrapMutation({
              mutation: setWithdrawalNotifications,
              input: value,
              optimisticResponse: { setWithdrawalNotifications: value },
              playerId: id,
              fragment: WITHDRAWAL_NOTIFICATION_FRAGMENT,
              getContactSettingsField: result => ({
                withdrawalNotifications: result.data.setWithdrawalNotifications,
              }),
            })
          }
          setAdventurerPublicity={value =>
            wrapMutation({
              mutation: setAdventurerPublicity,
              input: value,
              optimisticResponse: { setAdventurerPublicity: value },
              playerId: id,
              fragment: ADVENTURER_PUBLIC_FRAGMENT,
              getContactSettingsField: result => ({
                adventurerPublic: result.data.setAdventurerPublicity,
              }),
            })
          }
          setNewsletterSubscription={value =>
            wrapMutation({
              mutation: setNewsletterSubscription,
              input: value,
              optimisticResponse: { setNewsletterSubscription: value },
              playerId: id,
              fragment: SUBSCRIBED_TO_NEWSLETTERS_FRAGMENT,
              getContactSettingsField: result => ({
                subscribedToNewsletters: result.data.setNewsletterSubscription,
              }),
            })
          }
          setSMSNewsletterSubscription={value =>
            wrapMutation({
              mutation: setSMSNewsletterSubscription,
              input: value,
              optimisticResponse: { setSMSNewsletterSubscription: value },
              playerId: id,
              fragment: SUBSCRIBED_TO_SMS_NEWSLETTERS_FRAGMENT,
              getContactSettingsField: result => ({
                subscribedToSMSNewsletters:
                  result.data.setSMSNewsletterSubscription,
              }),
            })
          }
          setContactByPhone={value =>
            wrapMutation({
              mutation: setContactByPhone,
              input: value,
              optimisticResponse: { setContactByPhone: value },
              playerId: id,
              fragment: CONTACT_BY_PHONE_FRAGMENT,
              getContactSettingsField: result => ({
                contactByPhone: result.data.setContactByPhone,
              }),
            })
          }
          setContactByPost={value =>
            wrapMutation({
              mutation: setContactByPost,
              input: value,
              optimisticResponse: { setContactByPost: value },
              playerId: id,
              fragment: CONTACT_BY_POST_FRAGMENT,
              getContactSettingsField: result => ({
                contactByPost: result.data.setContactByPost,
              }),
            })
          }
        />
      );
    }}
  </Composed>
);

export const withConnect = (Component: React.AbstractComponent<any>) =>
  connect(state => ({
    jurisdiction: jurisdictionSelector(state),
  }))(Component);

export const SettingsNotificationsContainer = () =>
  withContainer(withConnect(SettingsNotifications));
