import { useRouter } from "next/router";

import routes, { nonDashboardRoutes } from "constants/routes";
import { useAuth } from "providers/AuthProvider";

const ProtectedHOC = ({ children, isReady }: any) => {
  // const router = useRouter();
  // const { tokenObject } = useAuth();

  // if (!isReady || router.pathname.includes("/public/")) {
  //   return "";
  // }

  // if (
  //   nonDashboardRoutes.includes(router.pathname) &&
  //   tokenObject.accessToken.length > 0
  // ) {
  //   router.replace(routes.home);
  //   return "";
  // } else if (
  //   !nonDashboardRoutes.includes(router.pathname) &&
  //   tokenObject.accessToken.length === 0
  // ) {
  //   router.replace(routes.login);
  //   return "";
  // }

  return children;
};

export default ProtectedHOC;
