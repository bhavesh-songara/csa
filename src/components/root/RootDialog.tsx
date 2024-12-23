import { DIALOG_COMPONENT_MAP } from "@/constants/dialog";
import { useAppSelector } from "@/redux/hooks";

export const RootDialog = () => {
  const { dialogStack } = useAppSelector((state) => state.dialog);

  return (
    <>
      {dialogStack.map((dialog, index) => {
        const DialogComponent = DIALOG_COMPONENT_MAP[dialog.dialogType];

        if (Boolean(DialogComponent)) {
          return <DialogComponent key={index} {...dialog.dialogProps} />;
        } else {
          return <> </>;
        }
      })}
    </>
  );
};
