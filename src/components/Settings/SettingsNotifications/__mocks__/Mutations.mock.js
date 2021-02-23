import {
  SetAdventurerPublicity,
  SetWithdrawalNotifications,
  SetContactByPost,
  SetContactByPhone,
  SetNewsletterSubscription,
  SetSMSNewsletterSubscription,
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '../Mutations.graphql' or its c... Remove this comment to see the full error message
} from "../Mutations.graphql";

export const withdrawalNotificationsMock = [true, false].map(on => ({
  request: {
    query: SetWithdrawalNotifications,
    variables: { input: { on } },
  },
  result: {
    data: { setWithdrawalNotifications: on },
  },
}));

export const withdrawalNotificationsErrorMock = withdrawalNotificationsMock.map(
  request => ({
    ...request,
    result: {
      errors: [{ foo: "bar" }],
    },
  })
);

export const adventurerPublicityMock = [true, false].map(on => ({
  request: {
    query: SetAdventurerPublicity,
    variables: { input: { on } },
  },
  result: {
    data: { setAdventurerPublicity: on },
  },
}));

export const adventurerPublicityErrorMock = adventurerPublicityMock.map(
  request => ({
    ...request,
    result: {
      errors: [{ foo: "bar" }],
    },
  })
);

export const contactByPostMock = [true, false].map(on => ({
  request: {
    query: SetContactByPost,
    variables: { input: { on } },
  },
  result: {
    data: { setContactByPost: on },
  },
}));

export const contactByPostErrorMock = contactByPostMock.map(request => ({
  ...request,
  result: {
    errors: [{ foo: "bar" }],
  },
}));

export const contactByPhoneMock = [true, false].map(on => ({
  request: {
    query: SetContactByPhone,
    variables: { input: { on } },
  },
  result: {
    data: { setContactByPhone: on },
  },
}));

export const contactByPhoneErrorMock = contactByPhoneMock.map(request => ({
  ...request,
  result: {
    errors: [{ foo: "bar" }],
  },
}));

export const newsletterSubscriptionMock = [true, false].map(on => ({
  request: {
    query: SetNewsletterSubscription,
    variables: { input: { on } },
  },
  result: {
    data: { setNewsletterSubscription: on },
  },
}));

export const newsletterSubscriptionErrorMock = newsletterSubscriptionMock.map(
  request => ({
    ...request,
    result: {
      errors: [{ foo: "bar" }],
    },
  })
);

export const SMSNewsletterSubscriptionMock = [true, false].map(on => ({
  request: {
    query: SetSMSNewsletterSubscription,
    variables: { input: { on } },
  },
  result: {
    data: { setSMSNewsletterSubscription: on },
  },
}));

export const SMSNewsletterSubscriptionErrorMock = SMSNewsletterSubscriptionMock.map(
  request => ({
    ...request,
    result: {
      errors: [{ foo: "bar" }],
    },
  })
);
