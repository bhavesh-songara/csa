import {
  ConfirmActionDialog,
  ConfirmActionDialogProps,
} from "@/components/common/ConfirmActionDialog";

export enum DialogType {
  ConfirmActionDialog = "ConfirmActionDialog",
}

export type DialogProps = ConfirmActionDialogProps;

export const DIALOG_COMPONENT_MAP: Record<DialogType, React.FC<DialogProps>> = {
  [DialogType.ConfirmActionDialog]: ConfirmActionDialog,
};
