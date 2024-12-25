import { DIALOG_COMPONENT_MAP } from "@/constants/dialog";
import { useAppSelector } from "@/redux/hooks";

export const RootDialog = () => {
  const { stack } = useAppSelector((state) => state.dialog);

  return (
    <>
      {stack.map((dialog, index) => {
        const DialogComponent = DIALOG_COMPONENT_MAP[dialog.type];

        if (Boolean(DialogComponent)) {
          return <DialogComponent key={index} {...dialog.props} />;
        } else {
          return <> </>;
        }
      })}
    </>
  );
};
