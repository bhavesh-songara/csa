export enum DialogType {}

export type DialogProps = any;

export const DIALOG_COMPONENT_MAP: Record<
  DialogType,
  React.FC<DialogProps>
> = {};
