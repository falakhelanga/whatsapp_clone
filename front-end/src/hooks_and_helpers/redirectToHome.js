import { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

const useRedirectHome = () => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    history.push("/");
  }, [history]);
};

export default useRedirectHome;
