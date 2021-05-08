import React, { FunctionComponent, useEffect, useReducer } from "react";
import Router from "next/router";

Router.events.on("routeChangeComplete", () => {
  if (document.querySelector(".workspace > .ant-layout")) {
    document.querySelector(".workspace > .ant-layout").scrollTop = 0;
  }
});

import { theme, ThemeType } from "components/styles/GlobalStyles";
import { ActionType } from "constants/types";

type AppStateType = {
  theme: ThemeType;
  collapsed: boolean;
  mobile: boolean;
  mobileDrawer: boolean;
};

interface AppContextType extends AppStateType {
  setTheme: (theme: ThemeType) => void;
  setMobileDrawerIsOpen: () => void;
}

enum APP_TYPES_ENUM {
  SET_THEME = "SET_THEME",
  SET_COLLAPSED = "SET_COLLAPSED",
  CHECK_IS_MOBILE_SCREEN = "CHECK_IS_MOBILE_SCREEN",
  SET_MOBILE_DRAWER_IS_OPEN = "SET_MOBILE_DRAWER_IS_OPEN",
}

let mql: any;
let mqlToCollapsed: any;

const initialValues = {
  theme: theme,
  collapsed: process.browser && window.innerWidth <= 1280,
  mobile: false,
  mobileDrawer: false,
};

const reducer = (state: AppStateType, action: ActionType) => {
  switch (action.type) {
    case APP_TYPES_ENUM.SET_THEME:
      return {
        ...state,
        theme: action.data,
      };
    case APP_TYPES_ENUM.SET_COLLAPSED:
      return {
        ...state,
        collapsed: !mqlToCollapsed.matches,
      };
    case APP_TYPES_ENUM.CHECK_IS_MOBILE_SCREEN:
      return {
        ...state,
        mobile: !mql.matches,
      };
    case APP_TYPES_ENUM.SET_MOBILE_DRAWER_IS_OPEN:
      return {
        ...state,
        mobileDrawer: !state.mobileDrawer,
      };

    default:
      break;
  }
};

const AppContext = React.createContext<AppContextType>({} as AppContextType);

const AppProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  const setTheme = (theme: ThemeType) => {
    dispatch({ type: APP_TYPES_ENUM.SET_THEME, data: theme });
  };

  const setCollapsed = () => {
    dispatch({ type: APP_TYPES_ENUM.SET_COLLAPSED });
  };

  const checkIsMobileScreen = () => {
    dispatch({ type: APP_TYPES_ENUM.CHECK_IS_MOBILE_SCREEN });
  };

  const setMobileDrawerIsOpen = () => {
    dispatch({ type: APP_TYPES_ENUM.SET_MOBILE_DRAWER_IS_OPEN });
  };

  const value = {
    ...state,
    setTheme,
    setMobileDrawerIsOpen,
  };

  useEffect(() => {
    mql = window.matchMedia(`(min-width: 992px)`);
    mql.addListener(checkIsMobileScreen);

    mqlToCollapsed = window.matchMedia(`(min-width: 1200px)`);
    mqlToCollapsed.addListener(setCollapsed);

    return () => {
      mql.removeListener(checkIsMobileScreen);
      mqlToCollapsed.removeListener(setCollapsed);
    };
  }, []);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType =>
  React.useContext<AppContextType>(AppContext);

export default AppProvider;
