import React, { useContext } from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import AuthContext from "../context/AuthContext";
function PublicRoute() {
  let { isLogged} = useContext(AuthContext);
  return isLogged ? <Navigate to='/dashboard'/> :<Outlet/>
}

export default PublicRoute;
