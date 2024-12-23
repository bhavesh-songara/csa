import { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  ScreenShareOffIcon as PresentationOff,
  Presentation,
  VideoOff,
  Video,
} from "lucide-react";

type MediaStreamButtonProps = {
  isStreaming: boolean;
  onIcon: "cancel_presentation" | "videocam_off";
  offIcon: "present_to_all" | "videocam";
  start: () => Promise<any>;
  stop: () => any;
};

export const MediaStreamButton = ({
  isStreaming,
  onIcon,
  offIcon,
  start,
  stop,
}: MediaStreamButtonProps) => {
  const getIcon = () => {
    switch (isStreaming ? onIcon : offIcon) {
      case "cancel_presentation":
        return <PresentationOff className="h-4 w-4" />;
      case "present_to_all":
        return <Presentation className="h-4 w-4" />;
      case "videocam_off":
        return <VideoOff className="h-4 w-4" />;
      case "videocam":
        return <Video className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={isStreaming ? stop : start}
      className="w-10 h-10"
    >
      {getIcon()}
    </Button>
  );
};
