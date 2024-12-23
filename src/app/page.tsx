"use client";

import ControlTray from "@/components/control-tray/ControlTray";
import { LiveAPIProvider } from "@/contexts/LiveAPIContext";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);

  return (
    <LiveAPIProvider apiKey={process.env.NEXT_PUBLIC_GEMINI_API_KEY as string}>
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
    </LiveAPIProvider>
  );
}
