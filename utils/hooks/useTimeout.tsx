import { useEffect } from "react";

const useTimeout = (
  callback: Function,
  miliseconds: number,
  desps: any[] = []
) => {
  useEffect(() => {
    let timeout = setTimeout(callback, miliseconds);
    return () => clearTimeout(timeout);
  }, desps);
};

export default useTimeout;
