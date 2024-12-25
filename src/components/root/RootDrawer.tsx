import { DRAWER_COMPONENT_MAP } from "@/constants/drawer";
import { useAppSelector } from "@/redux/hooks";

export const RootDrawer = () => {
  const { stack } = useAppSelector((state) => state.drawer);

  return (
    <>
      {stack.map((drawer, index) => {
        const DrawerComponent = DRAWER_COMPONENT_MAP[drawer.type];

        if (Boolean(DrawerComponent)) {
          return <DrawerComponent key={index} {...drawer.props} />;
        } else {
          return <> </>;
        }
      })}
    </>
  );
};
