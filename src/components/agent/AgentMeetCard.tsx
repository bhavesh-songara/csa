"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLiveAPIContext } from "@/contexts/LiveAPIContext";
import { IAgent } from "@/model/AgentModel";
import { Loader2, Phone } from "lucide-react";
import { useEffect, useState } from "react";

export default function AgentMeetCard(props: {
  agent: IAgent & {
    _id: string;
  };
  handleJoinMeet: () => void;
}) {
  const { agent, handleJoinMeet } = props;

  const [joining, setJoining] = useState(false);

  const { setConfig, connect } = useLiveAPIContext();

  useEffect(() => {
    setConfig((prev) => {
      return {
        ...prev,
        systemInstruction: {
          parts: [
            {
              text: `You are a customer service agent. Here's your details
              name: ${agent.name}
              description: ${agent.description}
              instructions: ${agent.instructions}
              `,
            },
            {
              text: `Connect with him go step wise do not complete all things in one go. First say hi how's day going and then ask him to share what support he needs. Be polite and friendly. Say thank you in the end.
              `,
            },
          ],
        },
      };
    });
  }, [agent]);

  const handleJoin = async () => {
    setJoining(true);

    await connect();

    handleJoinMeet();
    setJoining(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <Avatar className="h-12 w-12 ring-2 ring-primary/10">
                <AvatarFallback className="bg-primary/5">
                  {agent.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{agent.name}</h3>
              <p className="text-sm text-muted-foreground">Available</p>
            </div>
          </div>

          <Button
            className="w-full rounded-xl h-12 text-base"
            variant="default"
            onClick={handleJoin}
            disabled={joining}
          >
            {joining ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Phone className="mr-2 h-4 w-4" />
            )}
            Start Call
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
