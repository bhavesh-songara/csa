import { SHEET_COMPONENT_MAP } from "@/constants/sheet";
import { useAppSelector } from "@/redux/hooks";
import type { SheetType, SheetProps } from "@/constants/sheet";

export const RootSheet = () => {
  const { stack } = useAppSelector((state) => state.sheet);

  return (
    <>
      {stack.map(
        (sheet: { type: SheetType; props?: SheetProps }, index: number) => {
          const SheetComponent = SHEET_COMPONENT_MAP[sheet.type];

          if (Boolean(SheetComponent)) {
            return <SheetComponent key={index} {...sheet.props} />;
          } else {
            return <> </>;
          }
        }
      )}
    </>
  );
};
