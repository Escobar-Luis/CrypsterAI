import React, { useContext } from 'react';
import {Navigate, Outlet} from 'react-router-dom'
import AuthContext from "../context/AuthContext";
function PrivateRoute() {
  let { isLogged} = useContext(AuthContext);
  return isLogged ? <Outlet/> : <Navigate to='/login'/>
}

export default PrivateRoute;
