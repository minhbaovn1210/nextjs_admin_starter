import { FunctionComponent, useEffect, useState } from "react";
import { Layout as AntLayout, Spin } from "antd";
import { ThemeProvider } from "styled-components";
import { useRouter } from "next/router";

import { Container, Inner } from "components/Layout/styles/Page";
import { useAppContext } from "providers/AppProvider";
import ProtectedHOC from "HOC/ProtectedHOC";

import Header from "./Header";
import SidebarMenu from "./SidebarMenu";
import { nonDashboardRoutes } from "constants/routes";

const { Content } = AntLayout;

const Layout: FunctionComponent = ({ children }) => {
  const router = useRouter();
  const [preparing, setPreparing] = useState(true);
  const { theme, collapsed } = useAppContext();
  const isNotDashboard = nonDashboardRoutes.includes(router.pathname);

  useEffect(() => {
    setTimeout(() => {
      setPreparing(false);
    }, 500);
  }, [preparing]);

  return (
    <Spin size="large" spinning={preparing}>
      {router.pathname.includes("/public/") ? (
        children
      ) : (
        <ThemeProvider theme={theme}>
          <Container>
            <ProtectedHOC isReady={!preparing}>
              {!isNotDashboard && <Header />}
              <AntLayout className="workspace">
                {!isNotDashboard && <SidebarMenu collapsed={collapsed} />}

                <AntLayout>
                  <Content>
                    {!isNotDashboard ? <Inner>{children}</Inner> : children}
                  </Content>
                </AntLayout>
              </AntLayout>
            </ProtectedHOC>
          </Container>
        </ThemeProvider>
      )}
    </Spin>
  );
};

export default Layout;
