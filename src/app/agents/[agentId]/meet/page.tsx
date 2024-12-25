"use client";

import AgentMeetCard from "@/components/agent/AgentMeetCard";
import ControlTray from "@/components/control-tray/ControlTray";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveAPIProvider } from "@/contexts/LiveAPIContext";
import { cn } from "@/lib/utils";
import { AgentService } from "@/services/AgentService";
import { useQuery } from "@tanstack/react-query";
import { Bot, Phone } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";

export default function Meet() {
  const { agentId } = useParams();

  const videoRef = useRef<HTMLVideoElement>(null);

  const [meetJoined, setMeetJoined] = useState(false);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: [AgentService.BASE, { agentId: agentId as string }],
    queryFn: () => AgentService.getAgent(agentId as string),
    enabled: !!agentId,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Agent not found</div>;
  }

  return (
    <LiveAPIProvider apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY as string}>
      {!meetJoined && (
        <AgentMeetCard
          agent={data?.agent}
          handleJoinMeet={() => {
            setMeetJoined(true);
          }}
        />
      )}

      {meetJoined && (
        <div>
          <div className="h-[400px] w-[400px]">
            <video
              className={cn("stream", {
                hidden: !videoRef.current || !videoStream,
              })}
              ref={videoRef}
              autoPlay
              playsInline
            />
          </div>

          <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2">
            <ControlTray
              supportsVideo={true}
              videoRef={videoRef}
              onVideoStreamChange={setVideoStream}
            />
          </div>
        </div>
      )}
    </LiveAPIProvider>
  );
}
