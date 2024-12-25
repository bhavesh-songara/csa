import { FC } from "react";

import {
  AddAgentSheet,
  AddAgentSheetProps,
} from "@/components/agent/AddAgentSheet";

export enum SheetType {
  ADD_AGENT = "ADD_AGENT",
}

export type SheetProps = any | AddAgentSheetProps;

export const SHEET_COMPONENT_MAP: Record<SheetType, FC<SheetProps>> = {
  [SheetType.ADD_AGENT]: AddAgentSheet,
};
