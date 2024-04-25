import { useSelector } from "react-redux";
import { RootState } from "../services/store";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return currentUser.username ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
