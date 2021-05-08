import { Avatar, Dropdown, Layout, Menu } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import _get from "lodash/get";

import { useTranslation, i18n, languages } from "i18n";

import DashHeader from "./styles/Header";
import { useAppContext } from "providers/AppProvider";
import routes from "constants/routes";
import { useAuth } from "providers/AuthProvider";

const { Header } = Layout;

const MainHeader = () => {
  const { t } = useTranslation();
  const { mobile, setMobileDrawerIsOpen } = useAppContext();
  const router = useRouter();
  const { profile, reset } = useAuth();

  const changeLanguage = (lang: string) => () => {
    i18n.changeLanguage(lang);
  };

  const handleLogout = () => {
    reset();
    router.push(routes.login);
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <Link href="/">
          <a>{t("profile")}</a>
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={handleLogout}>{t("logout")}</Menu.Item>
    </Menu>
  );

  const flagMenu = (
    <Menu>
      {languages.map((lang: string) => (
        <Menu.Item key={lang} onClick={changeLanguage(lang)} className="mb-2">
          <div className="flex-row">
            <div className={`flag flag-24 flag-${lang} mr-2`} />
            <div>{t(lang)}</div>
          </div>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <DashHeader>
      <Header>
        {mobile && (
          <a onClick={setMobileDrawerIsOpen} className="trigger">
            <MenuUnfoldOutlined style={{ color: "white", fontSize: "14pt" }} />
          </a>
        )}

        <Link href="/">
          <a className="brand">
            <strong className="mx-1 text-white">
              <img
                src="/images/logo.png"
                width="36px"
                height="36px"
                alt="icon"
                className="mr-3 mb-1"
              />
              Admin Portal
            </strong>
          </a>
        </Link>

        <span className="mr-auto" />

        <Dropdown overlay={flagMenu} placement="bottomRight">
          <div className="right-header-item">
            <div className={`flag flag-24 flag-${i18n.language}`} />
          </div>
        </Dropdown>

        <Dropdown overlay={menu} placement="bottomRight">
          <div className="right-header-item">
            <div className="username mr-2">{profile.username}</div>
            <Avatar>{_get(profile, "username[0]", "User")}</Avatar>
          </div>
        </Dropdown>
      </Header>
    </DashHeader>
  );
};

export default MainHeader;
