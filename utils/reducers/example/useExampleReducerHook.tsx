import { useReducer } from "react";
import { ActionType } from "constants/types";
import HttpService from "lib/httpService";
import { TEST_URL } from "constants/api";

enum EXAMPLE_REDUCER_TYPE {
  SET_LOADING = "SET_LOADING",
  SET_DATA = "SET_DATA",
}

type StateType = {
  loading: boolean;
  list: any[];
  total: number;
};

const useExampleReducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case EXAMPLE_REDUCER_TYPE.SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case EXAMPLE_REDUCER_TYPE.SET_DATA:
      return {
        ...state,
        loading: false,
        ...action.data,
      };

    default:
      return state;
  }
};

const initialValues: StateType = {
  loading: false,
  list: [],
  total: 0,
};

const useExampleReducerHook = () => {
  const [state, dispatch] = useReducer(useExampleReducer, initialValues);

  const setLoading = (loading: boolean) => {
    dispatch({ type: EXAMPLE_REDUCER_TYPE.SET_LOADING, loading });
  };

  const setData = (data: any) => {
    dispatch({ type: EXAMPLE_REDUCER_TYPE.SET_DATA, data });
  };

  const getExampleList = () => {
    setLoading(true);

    HttpService()
      .get(TEST_URL)
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return {
    state: state as StateType,
    getExampleList,
  };
};

export default useExampleReducerHook;
