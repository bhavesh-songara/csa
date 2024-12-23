import { SHEET_COMPONENT_MAP } from "@/constants/sheet";
import { useAppSelector } from "@/redux/hooks";
import type { SheetType, SheetProps } from "@/constants/sheet";

export const RootSheet = () => {
  const { sheetStack } = useAppSelector((state) => state.sheet);

  return (
    <>
      {sheetStack.map(
        (
          sheet: { sheetType: SheetType; sheetProps?: SheetProps },
          index: number
        ) => {
          const SheetComponent = SHEET_COMPONENT_MAP[sheet.sheetType];

          if (Boolean(SheetComponent)) {
            return <SheetComponent key={index} {...sheet.sheetProps} />;
          } else {
            return <> </>;
          }
        }
      )}
    </>
  );
};
