import { mandatoryMessagesApi } from "./mandatoryMessages.api";
import { getMandatoryMessagesApi } from "./mandatoryMessages.api.getMandatoryMessages";

export const markAsReadApi = mandatoryMessagesApi.injectEndpoints({
  endpoints: builder => ({
    markAsRead: builder.mutation<void, string>({
      query: messageId => ({
        url: `/mark-as-read/${messageId}`,
        method: "PUT",
      }),
      onQueryStarted: async (messageId, { dispatch, queryFulfilled }) => {
        await queryFulfilled;

        dispatch(
          getMandatoryMessagesApi.util.updateQueryData(
            "getMandatoryMessages",
            undefined,
            draft => {
              return draft.filter(message => message.id !== messageId);
            }
          )
        );
      },
    }),
  }),
});

export const { useMarkAsReadMutation } = markAsReadApi;
