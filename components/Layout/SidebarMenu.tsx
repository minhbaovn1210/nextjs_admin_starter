import { Drawer, Layout, Menu } from "antd";
import { FunctionComponent, useEffect, useState } from "react";

import DashHeader from "components/Layout/styles/Header";
import Inner from "components/Layout/styles/Sidebar";
import Link from "next/link";
import { sidebarRoutes } from "constants/routes";
import { withRouter } from "next/router";
import { useAppContext } from "providers/AppProvider";
import { useTranslation } from "i18n";
import { SidebarRouteType } from "constants/types";

const { SubMenu } = Menu;
const { Header, Sider } = Layout;

const findDefaultOpenKeys = (pathname: string): string[] => {
  const index = sidebarRoutes.findIndex((item) => {
    if (item.children) {
      const child = item.children.find(
        (i: SidebarRouteType) => i.path === pathname
      );
      return !!child;
    }

    return item.path === pathname;
  });

  return index >= 0 ? [`${index}`] : ["0"];
};

const SidebarContent: FunctionComponent<any> = ({ collapsed, router }) => {
  const { setMobileDrawerIsOpen, mobile, mobileDrawer } = useAppContext();
  const { pathname, asPath, push } = router;

  const { t } = useTranslation();
  const [defaultOpenKeys] = useState(findDefaultOpenKeys(pathname));

  // Build for S3 ONLY
  // useEffect(() => {
  //   if (pathname !== asPath.split("?")[0] && pathname === "/") {
  //     console.log("Redirect because route is not correct");
  //     push(asPath);
  //   }
  // }, []);

  const menu = (
    <>
      <Menu
        className="border-0 scroll-y"
        style={{ flex: 1, height: "100%" }}
        mode="inline"
        defaultOpenKeys={defaultOpenKeys}
      >
        {sidebarRoutes.map((route, index) => {
          if (!route.children)
            return (
              <Menu.Item
                key={index}
                className={
                  pathname === route.path ? "ant-menu-item-selected" : ""
                }
                onClick={() => {
                  if (mobile) setMobileDrawerIsOpen();
                }}
              >
                <Link href={route.path} prefetch>
                  <a>
                    <span className="anticon">{<route.icon />}</span>
                    <span className="mr-auto">{t(route.name)}</span>
                  </a>
                </Link>
              </Menu.Item>
            );

          if (route.children)
            return (
              <SubMenu
                key={index}
                title={
                  <span>
                    <span className="anticon">{<route.icon />}</span>
                    <span>{t(route.name)}</span>
                  </span>
                }
              >
                {route.children.map(
                  (subitem: any, subItemIndex: SidebarRouteType) => (
                    <Menu.Item
                      key={`${index}-${subItemIndex}`}
                      className={
                        pathname === subitem.path
                          ? "ant-menu-item-selected"
                          : ""
                      }
                      onClick={() => {
                        if (mobile) setMobileDrawerIsOpen();
                      }}
                    >
                      <Link href={subitem.path} prefetch>
                        <a>
                          <span className="anticon">{<subitem.icon />}</span>
                          <span className="mr-auto">{t(subitem.name)}</span>
                        </a>
                      </Link>
                    </Menu.Item>
                  )
                )}
              </SubMenu>
            );
        })}
      </Menu>
    </>
  );

  return (
    <>
      <Inner>
        {!mobile && (
          <Sider width={265} collapsed={collapsed}>
            {menu}
          </Sider>
        )}

        <Drawer
          closable={false}
          placement="left"
          onClose={() => setMobileDrawerIsOpen()}
          visible={mobileDrawer}
          className="chat-drawer"
        >
          <Inner>
            <div>
              <DashHeader>
                <Header>
                  <Link href="/">
                    <a className="brand">
                      <strong className="mx-1 text-white">
                        {t("app-name")}
                      </strong>
                    </a>
                  </Link>
                </Header>
              </DashHeader>
              {menu}
            </div>
          </Inner>
        </Drawer>
      </Inner>
    </>
  );
};

export default withRouter(SidebarContent);
