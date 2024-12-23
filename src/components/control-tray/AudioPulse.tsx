import { cn } from "@/lib/utils";

type AudioPulseProps = {
  volume: number;
  active: boolean;
  hover: boolean;
};

export function AudioPulse({ volume, active, hover }: AudioPulseProps) {
  return (
    <div
      className={cn(
        "w-6 h-6 rounded-full transition-all duration-300 ease-in-out",
        {
          "bg-green-500": active,
          "bg-gray-300": !active,
          "scale-110": hover,
        }
      )}
      style={{
        transform: `scale(${1 + volume * 0.5})`,
      }}
    />
  );
}
