import { SidebarRouteType } from "./types";
import { HomeOutlined } from "@ant-design/icons";

const routes = {
  home: "/",
  login: "/login",
};

export const sidebarRoutes: SidebarRouteType[] = [
  {
    path: routes.home,
    name: "home",
    icon: HomeOutlined,
  },
];

export const nonDashboardRoutes = [routes.login];

export default routes;
