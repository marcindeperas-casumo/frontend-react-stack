// @flow
import React from "react";
import { Mutation, Query } from "react-apollo";
import { adopt } from "react-adopt";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { dataIdFromObject } from "Services/apolloCacheUtils";
import { ErrorMessage } from "Components/ErrorMessage";
import logger from "Services/logger";
import {
  SET_ADVENTURER_PUBLICITY,
  SET_WITHDRAWAL_NOTIFICATIONS,
  SET_CONTACT_BY_POST,
  SET_CONTACT_BY_PHONE,
  SET_NEWSLETTER_SUBSCRIPTION,
  SET_SMS_NEWSLETTER_SUBSCRIPTION,
} from "./Mutations";
import {
  PLAYER_CONTACT_SETTINGS_QUERY,
  WITHDRAWAL_NOTIFICATION_FRAGMENT,
  ADVENTURER_PUBLIC_FRAGMENT,
  SUBSCRIBED_TO_NEWSLETTERS_FRAGMENT,
  SUBSCRIBED_TO_SMS_NEWSLETTERS_FRAGMENT,
  CONTACT_BY_PHONE_FRAGMENT,
  CONTACT_BY_POST_FRAGMENT,
} from "./PlayerContactSettingsQuery";
import { NOTIFICATIONS_LABELS_QUERY } from "./NotificationsLabelsQuery";
import { Notifications } from "./Notifications";

const noop = () => {};

const Composed = adopt({
  setWithdrawalNotifications: ({ render }) => (
    //TODO: implement error handling when we have notifications in place
    //if onError is unset, Apollo default handler throws and tests break
    <Mutation mutation={SET_WITHDRAWAL_NOTIFICATIONS} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  setAdventurerPublicity: ({ render }) => (
    <Mutation mutation={SET_ADVENTURER_PUBLICITY} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  setContactByPost: ({ render }) => (
    <Mutation mutation={SET_CONTACT_BY_POST} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  setContactByPhone: ({ render }) => (
    <Mutation mutation={SET_CONTACT_BY_PHONE} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  setNewsletterSubscription: ({ render }) => (
    <Mutation mutation={SET_NEWSLETTER_SUBSCRIPTION} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  setSMSNewsletterSubscription: ({ render }) => (
    <Mutation mutation={SET_SMS_NEWSLETTER_SUBSCRIPTION} onError={noop}>
      {mutation => render(mutation)}
    </Mutation>
  ),
  labels: ({ render }) => (
    <Query query={NOTIFICATIONS_LABELS_QUERY}>{render}</Query>
  ),
});

const wrap = (mutation, on, optimisticResponse, getUpdatedCacheObject) =>
  mutation({
    variables: { input: { on } },
    optimisticResponse,
    update: (cache, result) => {
      try {
        cache.writeFragment(getUpdatedCacheObject(result));
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
    }) => {
      return (
        <Query query={PLAYER_CONTACT_SETTINGS_QUERY}>
          {({ loading, data, error, refetch }) => {
            if (loading || labels.loading) {
              return <SettingsRowListSkeleton count={8} />;
            }
            if (error) {
              return <ErrorMessage retry={() => refetch()} />;
            }
            if (labels.error) {
              return <ErrorMessage retry={() => labels.refetch()} />;
            }

            const {
              player: { id },
            } = data;

            return (
              <Component
                labels={labels.data}
                player={data.player}
                setWithdrawalNotifications={value =>
                  wrap(
                    setWithdrawalNotifications,
                    value,
                    { setWithdrawalNotifications: value },
                    result => ({
                      id: dataIdFromObject({ __typename: "Player", id }),
                      fragment: WITHDRAWAL_NOTIFICATION_FRAGMENT,
                      data: {
                        details: {
                          __typename: "PlayerDetails",
                          contactSettings: {
                            withdrawalNotifications:
                              result.data.setWithdrawalNotifications,
                            __typename: "PlayerContactSettings",
                          },
                        },
                        __typename: "Player",
                      },
                    })
                  )
                }
                setAdventurerPublicity={value =>
                  wrap(
                    setAdventurerPublicity,
                    value,
                    { setAdventurerPublicity: value },
                    result => ({
                      id: dataIdFromObject({ __typename: "Player", id }),
                      fragment: ADVENTURER_PUBLIC_FRAGMENT,
                      data: {
                        details: {
                          __typename: "PlayerDetails",
                          contactSettings: {
                            adventurerPublic:
                              result.data.setAdventurerPublicity,
                            __typename: "PlayerContactSettings",
                          },
                        },
                        __typename: "Player",
                      },
                    })
                  )
                }
                setNewsletterSubscription={value =>
                  wrap(
                    setNewsletterSubscription,
                    value,
                    { setNewsletterSubscription: value },
                    result => ({
                      id: dataIdFromObject({ __typename: "Player", id }),
                      fragment: SUBSCRIBED_TO_NEWSLETTERS_FRAGMENT,
                      data: {
                        details: {
                          __typename: "PlayerDetails",
                          contactSettings: {
                            subscribedToNewsletters:
                              result.data.setNewsletterSubscription,
                            __typename: "PlayerContactSettings",
                          },
                        },
                        __typename: "Player",
                      },
                    })
                  )
                }
                setSMSNewsletterSubscription={value =>
                  wrap(
                    setSMSNewsletterSubscription,
                    value,
                    { setSMSNewsletterSubscription: value },
                    result => ({
                      id: dataIdFromObject({ __typename: "Player", id }),
                      fragment: SUBSCRIBED_TO_SMS_NEWSLETTERS_FRAGMENT,
                      data: {
                        details: {
                          __typename: "PlayerDetails",
                          contactSettings: {
                            subscribedToSMSNewsletters:
                              result.data.setSMSNewsletterSubscription,
                            __typename: "PlayerContactSettings",
                          },
                        },
                        __typename: "Player",
                      },
                    })
                  )
                }
                setContactByPhone={value =>
                  wrap(
                    setContactByPhone,
                    value,
                    { setContactByPhone: value },
                    result => ({
                      id: dataIdFromObject({ __typename: "Player", id }),
                      fragment: CONTACT_BY_PHONE_FRAGMENT,
                      data: {
                        details: {
                          __typename: "PlayerDetails",
                          contactSettings: {
                            contactByPhone: result.data.setContactByPhone,
                            __typename: "PlayerContactSettings",
                          },
                        },
                        __typename: "Player",
                      },
                    })
                  )
                }
                setContactByPost={value =>
                  wrap(
                    setContactByPost,
                    value,
                    { setContactByPost: value },
                    result => ({
                      id: dataIdFromObject({ __typename: "Player", id }),
                      fragment: CONTACT_BY_POST_FRAGMENT,
                      data: {
                        details: {
                          __typename: "PlayerDetails",
                          contactSettings: {
                            contactByPost: result.data.setContactByPost,
                            __typename: "PlayerContactSettings",
                          },
                        },
                        __typename: "Player",
                      },
                    })
                  )
                }
              />
            );
          }}
        </Query>
      );
    }}
  </Composed>
);

export const NotificationsContainer = () => withContainer(Notifications);
