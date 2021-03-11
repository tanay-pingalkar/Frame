import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "../components/box";
import { setAuth } from "../redux/actions/setUser";
import "../styles/global.scss";

const App = () => {
  const isAuth = useSelector((state: any) => state.isAuth);
  const userInfo = useSelector((state: any) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuth);
  }, [dispatch]);

  console.log(isAuth, userInfo);
  return (
    <div className="full-box">
      <Box></Box>
    </div>
  );
};

export default App;
