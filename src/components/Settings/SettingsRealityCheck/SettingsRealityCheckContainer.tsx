import * as React from "react";
import { useQuery, useMutation } from "@apollo/client";
import * as A from "Types/apollo";
import { ErrorMessage } from "Components/ErrorMessage";
import { SettingsRowListSkeleton } from "Components/Settings/SettingsRow/SettingsRowListSkeleton";
import { useJurisdiction } from "Utils/hooks";
import { SettingsRealityCheck } from "./SettingsRealityCheck";
import { REALITY_CHECK_LABELS_QUERY } from "./SettingsRealityCheckLabelsQuery.graphql";
import { PLAYER_REALITY_CHECK_QUERY } from "./SettingsRealityCheckQuery";
import { UpdateRealityCheckInterval } from "./Mutations.graphql";

export function SettingsRealityCheckContainer() {
  const { jurisdiction } = useJurisdiction();
  const [
    localIntervalInMinutes,
    setLocalIntervalInMinutes,
  ] = React.useState<number>();
  const rcQuery = useQuery<
    A.Player_Reality_Check_Query,
    A.Player_Reality_Check_QueryVariables
  >(PLAYER_REALITY_CHECK_QUERY);

  const labelsQuery = useQuery<
    A.Reality_Check_Labels_Query,
    A.Reality_Check_Labels_QueryVariables
  >(REALITY_CHECK_LABELS_QUERY);

  const [updateRealityCheckInterval, updateQuery] = useMutation<
    A.UpdateRealityCheckIntervalMutation,
    A.UpdateRealityCheckIntervalMutationVariables
  >(UpdateRealityCheckInterval, {
    onError: () => rcQuery.refetch(),
    refetchQueries: [{ query: PLAYER_REALITY_CHECK_QUERY }],
  });

  React.useEffect(() => {
    if (rcQuery.loading || !rcQuery.data) {
      return;
    }

    setLocalIntervalInMinutes(
      rcQuery.data.player.playOk.realityCheck.intervalInMinutes
    );
  }, [rcQuery]);

  if (
    (rcQuery.loading && !rcQuery.data) ||
    (labelsQuery.loading && !labelsQuery.data)
  ) {
    return <SettingsRowListSkeleton count={8} />;
  }
  if (rcQuery.error) {
    return <ErrorMessage retry={() => rcQuery.refetch()} />;
  }
  if (labelsQuery.error) {
    return <ErrorMessage retry={() => labelsQuery.refetch()} />;
  }

  const {
    data: {
      player: {
        playOk: { realityCheck },
      },
    },
  } = rcQuery;
  const save = () => {
    if (!realityCheck.canChangeInterval) {
      return;
    }

    updateRealityCheckInterval({
      variables: {
        input: {
          intervalSeconds: localIntervalInMinutes * 60,
        },
      },
    });
  };

  return (
    <SettingsRealityCheck
      labels={labelsQuery.data}
      onSave={save}
      interval={localIntervalInMinutes}
      onChange={setLocalIntervalInMinutes}
      isLoading={updateQuery.loading}
      canToggleInterval={realityCheck.isZeroIntervalAllowed}
      jurisdiction={jurisdiction}
    />
  );
}
