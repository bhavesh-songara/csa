interface IPageSkeltonProps {
  visible?: boolean;
  count?: number;
}

export const PageSkelton: React.FC<IPageSkeltonProps> = ({
  visible = true,
  count = 3,
}) => {
  if (!visible) {
    return <></>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="aspect-video rounded-xl bg-muted/50" />
        ))}
      </div>
      <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
    </div>
  );
};
