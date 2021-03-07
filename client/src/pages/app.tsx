import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAuth } from "../redux/actions/setUser";

const App = () => {
  const isAuth = useSelector((state: any) => state.isAuth);
  const userInfo = useSelector((state: any) => state.userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setAuth);
  }, [dispatch]);

  console.log(isAuth, userInfo);
  return <h1>lol</h1>;
};

export default App;
