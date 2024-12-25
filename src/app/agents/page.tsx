"use client";

import { useQuery } from "@tanstack/react-query";

import { AgentService } from "@/services/AgentService";
import { Button } from "@/components/ui/button";
import { Bot, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { PageSkelton } from "@/components/common/PageSkelton";
import { Empty } from "@/components/common/Empty";
import { useAppDispatch } from "@/redux/hooks";
import { SheetType } from "@/constants/sheet";
import { showSheet } from "@/redux/sheet";
import { AgentCard } from "@/components/agent/AgentCard";

export default function AgentsPage() {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useQuery({
    queryKey: [AgentService.BASE],
    queryFn: () => AgentService.getAllAgents(),
  });

  const handleAddAgent = () => {
    dispatch(showSheet({ type: SheetType.ADD_AGENT }));
  };

  return (
    <div>
      <section className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6" />
          <h1 className="text-xl font-semibold">Agents</h1>
        </div>

        <Button onClick={handleAddAgent}>
          <Plus className="mr-1 h-4 w-4" />
          Add Agent
        </Button>
      </section>

      <div className="mt-4 px-4">
        <PageSkelton visible={isLoading} count={6} />
        <Empty
          title="No agents found"
          description="You haven't created any agents yet."
          visible={!isLoading && (!data?.data || data?.data?.length === 0)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data?.data?.map((agent) => {
            return <AgentCard key={agent._id} agent={agent} />;
          })}
        </div>
      </div>
    </div>
  );
}
