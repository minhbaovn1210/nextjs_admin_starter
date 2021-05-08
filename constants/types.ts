export type ActionType = {
  type: string;
  data?: any;
  loading?: boolean;
};

export type SidebarRouteType = {
  path: string;
  name: string;
  icon: any;
  children?: any;
};
