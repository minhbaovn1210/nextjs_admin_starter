import React, { FunctionComponent, useEffect, useReducer } from "react";
import _get from "lodash/get";
import moment from "moment";

import HttpService, { axiosInstance } from "lib/httpService";
import { AUTH_SERVICE_API } from "constants/api";

type TokenObjectType = {
  accessToken: string;
  refreshToken: string;
};

type ProfileType = any;

type StateType = {
  profile?: ProfileType;
  tokenObject: TokenObjectType;
  expiration?: number;
};

type ActionType = {
  type: string;
  data?: any;
};

interface AuthContextType extends StateType {
  setToken: (token: string) => void;
  getProfile: () => void;
  reset: () => void;
}

enum AUTH_TYPES_ENUM {
  SET_DATA_FROM_LOCAL_STORAGE = "SET_DATA_FROM_LOCAL_STORAGE",
  SET_TOKEN = "SET_TOKEN",
  SET_PROFILE = "SET_PROFILE",
  RESET = "RESET",
}

export const initialValues = {
  profile: {} as ProfileType,
  tokenObject: {
    accessToken: "",
    refreshToken: "",
    expiration: 0,
  },
};

const reducer = (state: StateType, action: ActionType) => {
  if (action.type === AUTH_TYPES_ENUM.SET_DATA_FROM_LOCAL_STORAGE) {
    return action.data;
  }

  let newData = {
    ...state,
  };

  switch (action.type) {
    case AUTH_TYPES_ENUM.SET_TOKEN:
      newData.tokenObject = action.data;
      break;
    case AUTH_TYPES_ENUM.SET_PROFILE:
      newData.profile = action.data;
      break;
    case AUTH_TYPES_ENUM.RESET:
      newData = initialValues;
      break;
    default:
      break;
  }

  localStorage.setItem("BACK_OFFICE_USER_INFO", JSON.stringify(newData));

  return newData;
};

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

const AuthProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialValues);

  useEffect(() => {
    const localStorageData = localStorage.getItem("BACK_OFFICE_USER_INFO");
    if (localStorageData) {
      const localStorageDataJSON = JSON.parse(localStorageData);

      const timestampNow = moment().unix();
      const expiration = _get(
        localStorageDataJSON,
        "tokenObject.expiration",
        0
      );

      if (timestampNow >= expiration && expiration !== 0) {
        reset();
      } else {
        dispatch({
          type: AUTH_TYPES_ENUM.SET_DATA_FROM_LOCAL_STORAGE,
          data: localStorageDataJSON,
        });

        if (
          _get(localStorageDataJSON, "tokenObject.accessToken.length", 0) > 0
        ) {
          getProfile();
        }
      }
    }

    const storageChangeHandler = (e: StorageEvent) => {
      if (e.key === "BACK_OFFICE_USER_INFO" && e.oldValue && e.newValue) {
        if (
          _get(JSON.parse(e.oldValue), "tokenObject.accessToken") !==
          _get(JSON.parse(e.newValue), "tokenObject.accessToken")
        ) {
          window.location.reload();
        }
      }
    };

    window.addEventListener("storage", storageChangeHandler);
    return () => {
      window.removeEventListener("storage", storageChangeHandler);
    };
  }, []);

  const getProfile = () => {
    setTimeout(() => {
      HttpService()
        .get(AUTH_SERVICE_API.getCurrentUserProfileURL())
        .then((res) => {
          dispatch({
            type: AUTH_TYPES_ENUM.SET_PROFILE,
            data: _get(res, "data.data", {}),
          });
        });
    }, 200);
  };

  const setToken = (tokenObject: TokenObjectType) => {
    dispatch({ type: AUTH_TYPES_ENUM.SET_TOKEN, data: tokenObject });
  };

  const reset = () => {
    dispatch({ type: AUTH_TYPES_ENUM.RESET });
  };

  useEffect(() => {
    axiosInstance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${state.tokenObject.accessToken}`;
  }, [_get(state, "tokenObject.accessToken")]);

  const value = {
    ...state,
    setToken,
    getProfile,
    reset,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType =>
  React.useContext<AuthContextType>(AuthContext);

export default AuthProvider;
