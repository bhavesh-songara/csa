import React from "react";

interface EmptyProps {
  visible?: boolean;
  title: string;
  description: string;
  extra?: React.ReactNode;
}

export const Empty: React.FC<EmptyProps> = ({
  title,
  description,
  extra,
  visible = true,
}) => {
  if (!visible) {
    return <></>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 pt-0">
      <img
        src="/images/undraw/add-content.svg"
        alt="Empty"
        className="w-64 h-64"
      />
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-center">{description}</p>
      {extra}
    </div>
  );
};
