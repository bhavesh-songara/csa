"use client";

import { RefObject } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AudioPulse } from "@/components/control-tray/AudioPulse";
import { MediaStreamButton } from "@/components/control-tray/MediaStreamButton";
import { Mic, MicOff, Play, Pause } from "lucide-react";
import { useControlTray } from "@/hooks/use-control-tray";

export type ControlTrayProps = {
  videoRef: RefObject<HTMLVideoElement> | any;
  children?: React.ReactNode;
  supportsVideo: boolean;
  onVideoStreamChange?: (stream: MediaStream | null) => void;
};

function ControlTray({
  videoRef,
  children,
  onVideoStreamChange = () => {},
  supportsVideo,
}: ControlTrayProps) {
  const {
    renderCanvasRef,
    connectButtonRef,
    changeStreams,
    connected,
    connect,
    disconnect,
    volume,
    muted,
    setMuted,
    screenCapture,
    webcam,
  } = useControlTray({
    videoRef,
    supportsVideo,
    onVideoStreamChange,
  });

  return (
    <section className="bg-background p-4 rounded-lg shadow-md">
      <canvas className="hidden" ref={renderCanvasRef} />
      <div className="flex items-center gap-2">
        <nav
          className={cn("flex gap-2", {
            "opacity-50 pointer-events-none": !connected,
          })}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setMuted(!muted)}
            className="w-10 h-10"
          >
            {!muted ? (
              <Mic className="h-4 w-4" />
            ) : (
              <MicOff className="h-4 w-4" />
            )}
          </Button>

          <div className="w-10 h-10 flex items-center justify-center border rounded-md">
            <AudioPulse volume={volume} active={connected} hover={false} />
          </div>

          {supportsVideo && (
            <>
              <MediaStreamButton
                isStreaming={screenCapture.isStreaming}
                start={changeStreams(screenCapture)}
                stop={changeStreams()}
                onIcon="cancel_presentation"
                offIcon="present_to_all"
              />
              <MediaStreamButton
                isStreaming={webcam.isStreaming}
                start={changeStreams(webcam)}
                stop={changeStreams()}
                onIcon="videocam_off"
                offIcon="videocam"
              />
            </>
          )}
          {children}
        </nav>

        <div
          className={cn("flex items-center", {
            "text-primary": connected,
          })}
        >
          <div className="mr-2">
            <Button
              ref={connectButtonRef}
              variant={connected ? "destructive" : "default"}
              size="icon"
              onClick={connected ? disconnect : connect}
              className="w-10 h-10"
            >
              {connected ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ControlTray;
