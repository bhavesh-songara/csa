import { useMutation, useQueryClient } from "@tanstack/react-query";

import queryFetcher from "@/lib/queryFetcher";
import { AgentService } from "@/services/AgentService";
import { toast } from "../use-toast";
import { onMutationError } from "@/lib/onMutationError";

export const useAgentMutation = () => {
  const queryClient = useQueryClient();

  const addAgentMutation = useMutation({
    mutationFn: (agent: {
      name: string;
      description?: string;
      instructions: string;
    }) =>
      queryFetcher({
        method: "POST",
        url: AgentService.BASE,
        data: agent,
      }),
    onSuccess: () => {
      toast({
        title: "Agent added",
        description: "Agent added successfully",
      });

      queryClient.invalidateQueries({ queryKey: [AgentService.BASE] });
    },
    onError: onMutationError,
  });

  const updateAgentMutation = useMutation({
    mutationFn: (payload: {
      agentId: string;
      name: string;
      description?: string;
      instructions: string;
    }) => {
      const { agentId, ...data } = payload;
      return queryFetcher({
        method: "PUT",
        url: `${AgentService.BASE}/${agentId}`,
        data,
      });
    },
    onSuccess: () => {
      toast({
        title: "Agent updated",
        description: "Agent updated successfully",
      });

      queryClient.invalidateQueries({ queryKey: [AgentService.BASE] });
    },
    onError: onMutationError,
  });

  const deleteAgentMutation = useMutation({
    mutationFn: (agentId: string) =>
      queryFetcher({
        method: "DELETE",
        url: `${AgentService.BASE}/${agentId}`,
      }),
    onSuccess: () => {
      toast({
        title: "Agent deleted",
        description: "Agent deleted successfully",
      });

      queryClient.invalidateQueries({ queryKey: [AgentService.BASE] });
    },
    onError: onMutationError,
  });

  return { addAgentMutation, updateAgentMutation, deleteAgentMutation };
};
