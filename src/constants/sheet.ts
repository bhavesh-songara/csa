import { FC } from "react";

export enum SheetType {
  CREATE_AGENT = "CREATE_AGENT",
  EDIT_AGENT = "EDIT_AGENT",
  AGENT_DETAILS = "AGENT_DETAILS",
}

export type SheetProps = any;

const PlaceholderComponent: FC<SheetProps> = () => null;

export const SHEET_COMPONENT_MAP: Record<SheetType, FC<SheetProps>> = {
  [SheetType.CREATE_AGENT]: PlaceholderComponent,
  [SheetType.EDIT_AGENT]: PlaceholderComponent,
  [SheetType.AGENT_DETAILS]: PlaceholderComponent,
};
