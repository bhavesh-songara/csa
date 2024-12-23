import { DRAWER_COMPONENT_MAP } from "@/constants/drawer";
import { useAppSelector } from "@/redux/hooks";

export const RootDrawer = () => {
  const { drawerStack } = useAppSelector((state) => state.drawer);

  return (
    <>
      {drawerStack.map((drawer, index) => {
        const DrawerComponent = DRAWER_COMPONENT_MAP[drawer.drawerType];

        if (Boolean(DrawerComponent)) {
          return <DrawerComponent key={index} {...drawer.drawerProps} />;
        } else {
          return <> </>;
        }
      })}
    </>
  );
};
